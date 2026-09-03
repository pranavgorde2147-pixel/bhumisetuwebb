# BHUMISETU API Reference

Base URL: `http://localhost:8080/api`

All endpoints require JWT authentication unless noted. Pass the token as:
```
Authorization: Bearer <jwt_token>
```

---

## Authentication

### Send OTP
```
POST /api/auth/send-otp
```

**Request:**
```json
{
  "mobileNumber": "+919876543210"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "OTP sent successfully",
    "expiresIn": 300
  }
}
```

### Verify OTP
```
POST /api/auth/verify-otp
```

**Request:**
```json
{
  "mobileNumber": "+919876543210",
  "otp": "123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "citizenId": 1,
    "name": "Arjun Mehta",
    "expiresIn": 86400
  }
}
```

---

## Parcels

### Get Parcel by ID
```
GET /api/parcels/{parcelId}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "parcelId": "PB-CHD-000128",
    "ulpin": "PB-CHD-ULP-2024-00128",
    "surveyNumber": "128",
    "khasraNumber": "K-128",
    "khataNumber": "KH-128",
    "village": "Mauli Jagran",
    "tehsil": "Chandigarh",
    "district": "Chandigarh",
    "state": "Chandigarh",
    "areaSqM": 1240.00,
    "landUse": "RESIDENTIAL",
    "status": "ACTIVE",
    "riskScore": "LOW",
    "centerLat": 30.7333000,
    "centerLng": 76.7794000
  }
}
```

### Search Parcels
```
GET /api/parcels?state=Chandigarh&district=Chandigarh&village=Mauli+Jagran&page=0&size=20
```

**Query Parameters:**
| Parameter  | Type    | Description              |
|------------|---------|--------------------------|
| state      | string  | Filter by state          |
| district   | string  | Filter by district       |
| village    | string  | Filter by village        |
| landUse    | string  | Filter by land use       |
| status     | string  | Filter by status         |
| page       | int     | Page number (0-based)    |
| size       | int     | Page size (default 20)   |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "content": [...],
    "totalElements": 150,
    "totalPages": 8,
    "number": 0,
    "size": 20
  }
}
```

---

## Ownership

### Get Owners for Parcel
```
GET /api/parcels/{parcelId}/owners
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "parcelId": 1,
      "name": "Arjun Mehta",
      "ownerType": "Individual",
      "sharePercentage": 100.00,
      "recordSource": "Chandigarh Revenue Department",
      "lastVerified": "2026-01-15T10:30:00",
      "effectiveDate": "2020-06-15"
    }
  ]
}
```

---

## Record of Rights

### Get RoR for Parcel
```
GET /api/parcels/{parcelId}/ror
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "parcelId": 1,
    "recordNumber": "ROR-CHD-2024-00128",
    "khasraKhata": "K-128/KH-128",
    "landType": "Non-Agricultural",
    "issueDate": "2020-06-15",
    "status": "ACTIVE",
    "source": "Chandigarh Revenue Department"
  }
}
```

---

## Registration

### Get Registration for Parcel
```
GET /api/parcels/{parcelId}/registration
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "parcelId": 1,
    "transactionId": "REG-CHD-2020-04521",
    "registrationDate": "2020-06-15",
    "sroOffice": "SRO Chandigarh - Sector 17",
    "deedType": "Sale Deed",
    "considerationAmount": 4500000.00,
    "status": "REGISTERED"
  }
}
```

---

## Mutation

### Get Mutation Records
```
GET /api/mutations?parcelId=1&status=SUBMITTED
```

### Get Mutation by ID
```
GET /api/mutations/{mutationId}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "parcelId": 1,
    "mutationId": "MUT-2026-00912",
    "mutationType": "Succession",
    "applicantName": "Arjun Mehta",
    "status": "SUBMITTED",
    "submittedDate": "2026-03-10T09:15:00",
    "remarks": "Mutation application for succession after father's demise.",
    "source": "Chandigarh Revenue Department"
  }
}
```

---

## Encumbrance

### Get Encumbrances for Parcel
```
GET /api/parcels/{parcelId}/encumbrances
```

**Response (200):**
```json
{
  "success": true,
  "data": []
}
```

---

## Planning

### Get Planning Record for Parcel
```
GET /api/parcels/{parcelId}/planning
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "parcelId": 1,
    "currentLandUse": "Residential",
    "zoningCategory": "R-1 (Residential)",
    "masterPlanClassification": "Residential Zone - Low Density",
    "buildingPermissionStatus": "Approved",
    "restrictions": "Max building height: 15m. Min setback: 3m front, 2m sides."
  }
}
```

---

## Property Tax

### Get Tax for Parcel
```
GET /api/parcels/{parcelId}/tax
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "parcelId": 1,
    "assessmentYear": "2026-2027",
    "annualTax": 12500.00,
    "outstandingAmount": 0.00,
    "paymentStatus": "PAID",
    "lastPaymentDate": "2026-04-01"
  }
}
```

---

## Disputes

### Get Disputes for Parcel
```
GET /api/parcels/{parcelId}/disputes
```

**Response (200):**
```json
{
  "success": true,
  "data": []
}
```

---

## Documents

### Get Documents for Parcel
```
GET /api/parcels/{parcelId}/documents
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "parcelId": 1,
      "title": "Sale Deed - Arjun Mehta (2020)",
      "documentType": "Sale Deed",
      "category": "Registration",
      "filePath": "/documents/PB-CHD-000128/sale-deed-2020.pdf",
      "fileSize": 245760,
      "mimeType": "application/pdf",
      "status": "VERIFIED"
    }
  ]
}
```

---

## Verification

### Get Verification Results
```
GET /api/parcels/{parcelId}/verification
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "parcelId": 1,
    "overallStatus": "REVIEW_REQUIRED",
    "checkResults": {
      "total_checks": 9,
      "passed": 7,
      "warnings": 1,
      "failed": 1,
      "checks": [
        {
          "check_name": "ownership_chain",
          "status": "PASS",
          "message": "Ownership chain is complete and verified"
        }
      ]
    },
    "verifiedAt": "2026-04-05T16:45:00"
  }
}
```

---

## Acquisition

### Get All Acquisition Projects
```
GET /api/acquisitions?status=IN_PROGRESS
```

### Get Acquisition Project
```
GET /api/acquisitions/{projectId}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "projectId": "LA-2026-0042",
    "projectName": "New Industrial Corridor - Chandigarh Extension",
    "authority": "Haryana Shehri Vikas Pradhikaran (HSVP)",
    "notificationDate": "2026-02-01",
    "currentStage": "AWARD_PUBLISHED",
    "status": "IN_PROGRESS"
  }
}
```

### Get Parcel Acquisitions
```
GET /api/acquisitions/{projectId}/parcels
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "parcelId": 1,
      "projectId": 1,
      "totalAreaSqM": 1240.00,
      "affectedAreaSqM": 420.00,
      "remainingAreaSqM": 820.00,
      "acquisitionStatus": "PARTIAL",
      "awardStatus": "PUBLISHED",
      "compensationStatus": "PENDING"
    }
  ]
}
```

---

## Interpretation

### Translate Document Fields
```
POST /api/interpretation/translate
```

**Request:**
```json
{
  "sourceState": "Maharashtra",
  "targetState": "Chandigarh",
  "documentType": "7/12 Extract",
  "fields": {
    "survey_number": "128",
    "owner_name": "Arjun Mehta",
    "area": "1240"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "translated_fields": {
      "khasra_number": "128",
      "owner_name": "Arjun Mehta",
      "area_sq_m": "1240"
    },
    "confidence": 0.95,
    "mappings_used": ["Survey Number → Khasra Number"]
  }
}
```

### Get State Profiles
```
GET /api/interpretation/states
```

---

## GIS

### Get Parcel Geometry
```
GET /api/gis/parcel/{parcelId}/geojson
```

**Response (200):**
```json
{
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[76.7788, 30.7327], [76.7800, 30.7327], [76.7800, 30.7339], [76.7788, 30.7339], [76.7788, 30.7327]]]
  },
  "properties": {
    "parcelId": "PB-CHD-000128",
    "areaSqM": 1240.00
  }
}
```

### Bounding Box Query
```
GET /api/gis/bbox?west=76.77&south=30.73&east=76.79&north=30.74
```

---

## Notifications

### Get Notifications
```
GET /api/notifications?isRead=false&page=0&size=20
```

### Mark as Read
```
PATCH /api/notifications/{id}/read
```

---

## Service Requests

### Create Service Request
```
POST /api/service-requests
```

**Request:**
```json
{
  "parcelId": "PB-CHD-000128",
  "serviceType": "MUTATION",
  "description": "Request mutation for succession"
}
```

### Get My Service Requests
```
GET /api/service-requests?page=0&size=20
```

---

## Transactions

### Get Transaction by ID
```
GET /api/transactions/{transactionId}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "citizenId": 1,
    "parcelId": 1,
    "transactionType": "MUTATION",
    "status": "SUBMITTED",
    "events": [
      {
        "eventType": "CREATED",
        "description": "Transaction created",
        "createdAt": "2026-03-10T09:15:00"
      }
    ]
  }
}
```

---

## Error Codes

| Code  | HTTP Status | Description                        |
|-------|-------------|------------------------------------|
| 400   | Bad Request | Invalid request parameters         |
| 401   | Unauthorized| Missing or invalid JWT token       |
| 403   | Forbidden   | Insufficient permissions           |
| 404   | Not Found   | Resource not found                 |
| 409   | Conflict    | Duplicate resource                 |
| 422   | Unprocessable| Validation failed                 |
| 500   | Server Error| Internal server error              |

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Parcel with ID PB-CHD-999999 not found",
    "details": null
  }
}
```

---

## Pagination

All list endpoints support pagination via query parameters:
- `page` — Page number (0-based, default: 0)
- `size` — Page size (default: 20, max: 100)
- `sort` — Sort field and direction (e.g., `created_at,desc`)

### Paginated Response Format
```json
{
  "content": [...],
  "totalElements": 150,
  "totalPages": 8,
  "number": 0,
  "size": 20,
  "first": true,
  "last": false
}
```
