# BHUMISETU

A unified land records platform that aggregates cadastral, ownership, registration, mutation, tax, planning, and acquisition data into a single verifiable "Land Passport" for every parcel across Indian states.

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Frontend     | React 18, TypeScript, Vite          |
| Maps         | MapLibre GL JS                      |
| Backend      | Spring Boot 3.3, Java 21           |
| Database     | PostgreSQL 15, PostGIS 3.4          |
| Auth         | JWT (jjwt 0.12), OTP-based login   |
| API Docs     | SpringDoc OpenAPI 2.5               |
| Build        | Maven 3.8+ (backend), npm (frontend)|
| Deployment   | Railway, Docker, Docker Compose     |

## Quick Start

### Prerequisites
- Java 21+
- Node.js 18+
- PostgreSQL 15+ with PostGIS

### Backend

```bash
cd backend
mvn spring-boot:run
# API: http://localhost:8080
# Swagger: http://localhost:8080/swagger-ui.html
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# App: http://localhost:5173
```

### Database Setup

```bash
psql -U postgres -c "CREATE DATABASE bhumisetu;"
psql -U postgres -d bhumisetu -c "CREATE EXTENSION postgis;"

for f in $(ls database/migrations/V*.sql | sort); do
  psql -U postgres -d bhumisetu -f "$f"
done
```

## Project Structure

```
bhumisetuwebb/
├── backend/                          # Spring Boot REST API
│   ├── pom.xml
│   └── src/main/java/com/bhumisetu/
│       ├── auth/                     # OTP + JWT authentication
│       ├── acquisition/              # Land acquisition tracking
│       ├── common/                   # Shared exceptions, responses
│       ├── config/                   # Security, CORS, OpenAPI
│       ├── encumbrance/              # Mortgage/lien records
│       ├── gis/                      # Spatial queries & tiles
│       ├── mutation/                 # Land mutation workflow
│       ├── planning/                 # Zoning & building permissions
│       ├── registration/             # SRO registration records
│       ├── ror/                      # Record of Rights
│       ├── tax/                      # Property tax
│       └── verification/             # 9-check verification engine
│
├── frontend/                         # React SPA
│   ├── src/
│   │   ├── pages/                    # Route pages
│   │   │   ├── Home.tsx
│   │   │   ├── Parcel.tsx
│   │   │   ├── LandPassport.tsx
│   │   │   ├── FindLand.tsx
│   │   │   ├── Map.tsx
│   │   │   ├── Ownership.tsx
│   │   │   ├── RoR.tsx
│   │   │   ├── Registration.tsx
│   │   │   ├── Mutation.tsx
│   │   │   ├── Encumbrance.tsx
│   │   │   ├── Tax.tsx
│   │   │   ├── Disputes.tsx
│   │   │   ├── Planning.tsx
│   │   │   ├── Documents.tsx
│   │   │   ├── Verification.tsx
│   │   │   ├── Acquisition.tsx
│   │   │   ├── Interpretation.tsx
│   │   │   ├── Notifications.tsx
│   │   │   ├── Transactions.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Profile.tsx
│   │   │   └── Login.tsx
│   │   ├── api/                      # Axios API client
│   │   ├── components/               # Reusable UI components
│   │   ├── models/                   # TypeScript interfaces
│   │   ├── state/                    # React state management
│   │   ├── styles/                   # CSS stylesheets
│   │   └── utils/                    # Helper functions
│   └── index.html
│
├── database/
│   ├── migrations/                   # Flyway-style SQL migrations (V1–V18)
│   └── seed/                         # Demo seed data (V19)
│
├── docs/
│   ├── architecture/                 # System architecture docs
│   ├── api/                          # API reference
│   └── deployment/                   # Deployment guide
│
└── .env.example                      # Environment variable template
```

## Environment Variables

| Variable              | Required | Description                    | Default                     |
|-----------------------|----------|--------------------------------|-----------------------------|
| `SPRING_PROFILES_ACTIVE` | No     | Profile (development/production)| `development`              |
| `DB_URL`              | Prod     | PostgreSQL JDBC URL            | `jdbc:postgresql://localhost:5432/bhumisetu` |
| `DB_USERNAME`         | Prod     | Database username              | `bhumisetu`                 |
| `DB_PASSWORD`         | Prod     | Database password              | —                           |
| `JWT_SECRET`          | Prod     | JWT signing secret (Base64)    | —                           |
| `JWT_EXPIRATION_MS`   | No       | Token lifetime (ms)            | `86400000` (24h)            |
| `CORS_ORIGINS`        | No       | Allowed origins                | `http://localhost:3000,...`  |
| `DOCUMENTS_PATH`      | No       | File storage path              | `/var/lib/bhumisetu/documents` |
| `MAPS_CACHE_PATH`     | No       | Tile cache path                | `/var/lib/bhumisetu/maps-cache` |

## API Overview

### Authentication
- `POST /api/auth/send-otp` — Send OTP to mobile
- `POST /api/auth/verify-otp` — Verify OTP, receive JWT

### Land Records
- `GET /api/parcels/{id}` — Parcel details
- `GET /api/parcels/{id}/owners` — Ownership records
- `GET /api/parcels/{id}/ror` — Record of Rights
- `GET /api/parcels/{id}/registration` — Registration history
- `GET /api/parcels/{id}/encumbrances` — Encumbrances
- `GET /api/parcels/{id}/planning` — Zoning/planning
- `GET /api/parcels/{id}/tax` — Property tax
- `GET /api/parcels/{id}/disputes` — Active disputes
- `GET /api/parcels/{id}/documents` — Attached documents
- `GET /api/parcels/{id}/verification` — Verification report

### Mutations
- `GET /api/mutations` — List mutations
- `GET /api/mutations/{id}` — Mutation detail

### Acquisition
- `GET /api/acquisitions` — List projects
- `GET /api/acquisitions/{id}` — Project detail
- `GET /api/acquisitions/{id}/parcels` — Affected parcels

### Services
- `POST /api/service-requests` — Submit service request
- `GET /api/transactions/{id}` — Transaction status
- `GET /api/notifications` — Citizen notifications

### GIS
- `GET /api/gis/parcel/{id}/geojson` — Parcel geometry
- `GET /api/gis/bbox` — Spatial bbox query

Full API reference: [`docs/api/README.md`](docs/api/README.md)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "feat: add my feature"`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request

### Code Style
- Backend: Follow Spring Boot conventions, use Lombok
- Frontend: TypeScript strict mode, functional components
- SQL: Flyway naming (`V{version}__{description}.sql`)
- Commits: [Conventional Commits](https://www.conventionalcommits.org/) format

### Testing
```bash
# Backend tests
cd backend && mvn test

# Frontend lint
cd frontend && npm run lint
```

## License

Government of India — Land Records Modernization
