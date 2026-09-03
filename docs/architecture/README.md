# BHUMISETU Architecture

## System Overview

BHUMISETU is a unified land records platform that aggregates cadastral, ownership, registration, mutation, tax, and acquisition data into a single verifiable "Land Passport" for every parcel across Indian states. It bridges heterogeneous state land record systems through semantic interpretation layers.

## Component Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BHUMISETU Platform                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   Frontend   │  │   Backend    │  │   Database   │              │
│  │   React/TS   │  │  Spring Boot │  │ PostgreSQL+  │              │
│  │  MapLibre GL │  │   Java 21    │  │   PostGIS    │              │
│  │              │  │   REST API   │  │              │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
│         │                  │                  │                      │
│         └──────────────────┼──────────────────┘                      │
│                            │                                        │
│  ┌─────────────────────────┼─────────────────────────┐              │
│  │           Service Layer │                        │              │
│  ├─────────────────────────┼─────────────────────────┤              │
│  │ Parcel Service          │ Ownership Service       │              │
│  │ Registration Service    │ Mutation Service        │              │
│  │ Tax Service             │ Encumbrance Service     │              │
│  │ Planning Service        │ Dispute Service         │              │
│  │ Verification Service    │ Document Service        │              │
│  │ Acquisition Service     │ Notification Service    │              │
│  │ Interpretation Service  │ GIS Service             │              │
│  │ Auth Service            │ Transaction Service     │              │
│  └───────────────────────────────────────────────────┘              │
│                                                                     │
│  ┌───────────────────────────────────────────────────┐              │
│  │              External Integrations                │              │
│  ├───────────────────────────────────────────────────┤              │
│  │ State Land Record APIs   │ Registration Portals   │              │
│  │ Survey of India          │ Municipal Corporations │              │
│  │ National Land Monetization│ SMS/Email Services    │              │
│  └───────────────────────────────────────────────────┘              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
Citizen Request → Auth (OTP/JWT) → API Gateway → Service Layer
    ↓                                    ↓
   JWT Token                        Validation
    ↓                                    ↓
Frontend (React) ←──── JSON Response ──── Service → Repository → PostgreSQL
    ↓                                    ↓
  MapLibre GL                    PostGIS Queries
    ↓                                    ↓
  Map View                    Spatial Index (GIST)
```

### Land Passport Generation Flow

```
1. Parcel Lookup (by ULPIN/Parcel ID)
2. Parallel Data Fetch:
   ├── Ownership records
   ├── RoR (Record of Rights)
   ├── Registration history
   ├── Mutation status
   ├── Encumbrance check
   ├── Tax compliance
   ├── Dispute status
   ├── Planning/Zoning
   ├── Document inventory
   ├── Acquisition status
   └── Provenance metadata
3. Verification Engine (9-check suite)
4. Risk Score Calculation
5. Passport Assembly
6. Response to Client
```

## API Contract Summary

| Module          | Base Path               | Methods                    |
|-----------------|-------------------------|----------------------------|
| Auth            | `/api/auth`             | POST (send/verify OTP)     |
| Parcels         | `/api/parcels`          | GET, GET/:id               |
| Ownership       | `/api/parcels/:id/owners`| GET                       |
| RoR             | `/api/parcels/:id/ror`  | GET                        |
| Registration    | `/api/parcels/:id/registration` | GET                |
| Mutation        | `/api/mutations`        | GET, GET/:id               |
| Encumbrance     | `/api/parcels/:id/encumbrances` | GET              |
| Planning        | `/api/parcels/:id/planning` | GET                   |
| Tax             | `/api/parcels/:id/tax`  | GET                        |
| Disputes        | `/api/parcels/:id/disputes` | GET                  |
| Documents       | `/api/parcels/:id/documents` | GET                 |
| Verification    | `/api/parcels/:id/verification` | GET             |
| Acquisition     | `/api/acquisitions`     | GET, GET/:projectId        |
| Interpretation  | `/api/interpretation`   | POST (translate)           |
| GIS             | `/api/gis`              | GET (tiles, bbox)          |
| Notifications   | `/api/notifications`    | GET, PATCH (read)          |
| Service Requests| `/api/service-requests` | GET, POST                  |
| Transactions    | `/api/transactions`     | GET, GET/:id               |

All endpoints are prefixed with `/api/` and require JWT authentication unless noted.

## Security Model

### Authentication
- **OTP-based login** for citizens (mobile number)
- **JWT tokens** with configurable expiration (default: 24 hours)
- **Stateless sessions** — no server-side session storage

### Authorization
- Role-based access: `CITIZEN`, `OFFICER`, `ADMIN`
- Citizens can only access their own parcels and service requests
- Officers can access parcels in their jurisdiction
- Admins have full access

### Data Security
- All API responses are filtered by ownership/authorization
- Sensitive fields (JWT secret, DB credentials) are externalized via environment variables
- Document storage is behind authenticated endpoints
- CORS restricted to configured origins
- PostGIS queries use parameterized statements (SQL injection prevention)

### Audit Trail
- Every mutation, registration, and acquisition event is logged
- Provenance records track data source and version
- Transaction events provide immutable event log

## GIS Architecture

### Stack
- **PostGIS** for server-side spatial queries and storage
- **MapLibre GL** for client-side vector tile rendering
- **GeoJSON** for API transport format

### Spatial Indexing
- GIST index on `parcel_geometry.geometry` for fast spatial lookups
- Bounding-box queries for map viewport
- Intersection queries for acquisition overlap detection

### Coordinate System
- All geometries stored in **WGS 84 (EPSG:4326)**
- Client renders in **Web Mercator (EPSG:3857)** (automatic by MapLibre)
- Parcel center points stored as `center_lat`/`center_lng` for quick access

### Data Layers
| Layer              | Source Table              | Style                |
|--------------------|---------------------------|----------------------|
| Parcels            | `parcel_geometry`         | Green fill, 30% opacity |
| Acquisition Zones  | `acquisition_geometries`  | Red hatched overlay  |
| Selected Parcel    | `parcel_geometry` (by ID) | Blue highlight       |

### Tile Serving
- `/api/gis/tiles/{z}/{x}/{y}.pbf` — vector tiles (future)
- `/api/gis/parcel/{parcelId}/geojson` — single parcel GeoJSON
- `/api/gis/bbox?west=&south=&east=&north=` — bbox query
