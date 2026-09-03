# BHUMISETU Deployment Guide

## Local Development Setup

### Prerequisites

- Java 21+
- Maven 3.8+
- Node.js 18+ & npm 9+
- PostgreSQL 15+ with PostGIS extension
- Git

### Backend

```bash
# Clone and enter backend
cd backend

# Run in development mode (uses H2 in-memory DB)
mvn spring-boot:run

# API available at http://localhost:8080
# Swagger UI at http://localhost:8080/swagger-ui.html
# H2 Console at http://localhost:8080/h2-console
```

### Frontend

```bash
# Enter frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# App available at http://localhost:5173
```

### Database (Production Profile)

```bash
# Create PostgreSQL database
psql -U postgres -c "CREATE DATABASE bhumisetu;"
psql -U postgres -d bhumisetu -c "CREATE EXTENSION postgis;"

# Run migrations in order
for f in database/migrations/V*.sql; do
  psql -U postgres -d bhumisetu -f "$f"
done

# Seed demo data
psql -U postgres -d bhumisetu -f database/seed/V19__seed_demo_data.sql

# Switch to production profile
export SPRING_PROFILES_ACTIVE=production
mvn spring-boot:run
```

---

## Environment Variables

| Variable            | Required | Description                              | Default                    |
|---------------------|----------|------------------------------------------|----------------------------|
| `SPRING_PROFILES_ACTIVE` | No   | Spring profile (development/production)  | development                |
| `DB_URL`            | Yes*     | PostgreSQL JDBC URL                      | `jdbc:postgresql://localhost:5432/bhumisetu` |
| `DB_USERNAME`       | Yes*     | Database username                        | bhumisetu                  |
| `DB_PASSWORD`       | Yes*     | Database password                        | —                          |
| `JWT_SECRET`        | Yes*     | Base64-encoded JWT signing secret        | —                          |
| `JWT_EXPIRATION_MS` | No       | JWT token expiration (ms)                | 86400000 (24h)             |
| `CORS_ORIGINS`      | No       | Allowed CORS origins (comma-separated)   | `http://localhost:3000,http://localhost:5173` |
| `DOCUMENTS_PATH`    | No       | Document storage path                    | `/var/lib/bhumisetu/documents` |
| `MAPS_CACHE_PATH`   | No       | Map tile cache path                      | `/var/lib/bhumisetu/maps-cache` |
| `PORT`              | No       | Server port                              | 8080                       |

*Required for production profile.

---

## Railway Deployment

### 1. Prepare PostgreSQL

Add a PostgreSQL service in Railway:
- Go to your Railway project
- Click **"+ New"** → **"Database"** → **"PostgreSQL"**
- Note the connection details

### 2. Add PostGIS Extension

Once PostgreSQL is provisioned, connect and enable PostGIS:

```bash
# Connect via Railway CLI or web console
psql $DATABASE_URL -c "CREATE EXTENSION postgis;"
```

### 3. Deploy Backend

1. Connect your GitHub repository to Railway
2. Add a new service → **"GitHub Repo"**
3. Set the service root to `backend/`
4. Add environment variables:

```
SPRING_PROFILES_ACTIVE=production
DB_URL=<Railway PostgreSQL connection string>
DB_USERNAME=<from Railway>
DB_PASSWORD=<from Railway>
JWT_SECRET=<generate a secure random string>
JWT_EXPIRATION_MS=86400000
CORS_ORIGINS=https://your-frontend.up.railway.app
DOCUMENTS_PATH=/var/lib/bhumisetu/documents
MAPS_CACHE_PATH=/var/lib/bhumisetu/maps-cache
```

5. Railway will auto-detect the Java/Maven project and deploy

### 4. Deploy Frontend

1. Add another service → **"GitHub Repo"**
2. Set the root to `frontend/`
3. Add environment variables:
   ```
   VITE_API_BASE_URL=https://your-backend.up.railway.app/api
   ```
4. Railway will run `npm install && npm run build`
5. Set the output directory to `dist/`

### 5. Run Migrations

SSH into the backend service or use Railway CLI:

```bash
railway run psql -f database/migrations/V1__create_citizens.sql
railway run psql -f database/migrations/V2__create_parcels.sql
# ... run all V1-V18
railway run psql -f database/seed/V19__seed_demo_data.sql
```

Or create a startup script that runs migrations on first boot.

---

## Docker Setup

### Dockerfile (Backend)

```dockerfile
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B
COPY src ./src
RUN ./mvnw package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Dockerfile (Frontend)

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgis/postgis:15-3.4
    environment:
      POSTGRES_DB: bhumisetu
      POSTGRES_USER: bhumisetu
      POSTGRES_PASSWORD: ${DB_PASSWORD:-devpassword}
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./database/migrations:/docker-entrypoint-initdb.d/migrations
      - ./database/seed:/docker-entrypoint-initdb.d/seed

  backend:
    build: ./backend
    environment:
      SPRING_PROFILES_ACTIVE: production
      DB_URL: jdbc:postgresql://postgres:5432/bhumisetu
      DB_USERNAME: bhumisetu
      DB_PASSWORD: ${DB_PASSWORD:-devpassword}
      JWT_SECRET: ${JWT_SECRET:-ZGV2LWp3dC1zZWNyZXQta2V5LWZvci1kZXZlbG9wbWVudC1vbmx5LWNoYW5nZS1pbi1wcm9kdWN0aW9u}
      CORS_ORIGINS: http://localhost:5173
    ports:
      - "8080:8080"
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "5173:80"
    depends_on:
      - backend

volumes:
  pgdata:
```

### Running with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop
docker-compose down
```

---

## Database Migrations

Migrations follow Flyway naming convention: `V{version}__{description}.sql`

| Version | File                              | Description                     |
|---------|-----------------------------------|---------------------------------|
| V1      | `V1__create_citizens.sql`         | Citizens table                  |
| V2      | `V2__create_parcels.sql`          | Parcels + PostGIS geometry      |
| V3      | `V3__create_ownership.sql`        | Owner records                   |
| V4      | `V4__create_record_of_rights.sql` | Record of Rights                |
| V5      | `V5__create_registration.sql`     | Registration records            |
| V6      | `V6__create_mutation.sql`         | Mutation records                |
| V7      | `V7__create_encumbrances.sql`     | Encumbrance records             |
| V8      | `V8__create_planning.sql`         | Planning/zoning records         |
| V9      | `V9__create_property_tax.sql`     | Property tax records            |
| V10     | `V10__create_disputes.sql`        | Dispute records                 |
| V11     | `V11__create_documents.sql`       | Document registry               |
| V12     | `V12__create_service_requests.sql`| Service requests                |
| V13     | `V13__create_transactions.sql`    | Transactions + events           |
| V14     | `V14__create_notifications.sql`   | Notifications                   |
| V15     | `V15__create_verification.sql`    | Verification results (JSONB)    |
| V16     | `V16__create_provenance.sql`      | Data provenance tracking        |
| V17     | `V17__create_interpretation.sql`  | State profiles + field mappings |
| V18     | `V18__create_acquisition.sql`     | Land acquisition records        |
| V19     | `V19__seed_demo_data.sql`         | Demo seed data                  |

Run migrations in order:
```bash
for f in $(ls database/migrations/V*.sql | sort); do
  psql -U postgres -d bhumisetu -f "$f"
done
```

---

## Production Checklist

- [ ] Generate secure `JWT_SECRET` (min 256-bit)
- [ ] Set `CORS_ORIGINS` to production frontend URL only
- [ ] Enable SSL/TLS on PostgreSQL connection
- [ ] Set up automated database backups
- [ ] Configure document storage with proper permissions
- [ ] Set `ddl-auto: validate` (never `create-drop` in production)
- [ ] Enable application health checks
- [ ] Configure log aggregation
- [ ] Set up monitoring and alerting
- [ ] Review PostGIS spatial indexes
