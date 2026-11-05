# Zwantum Commerce: API Conventions

## 1. Routing & Versioning

- **Base URI:** `/api/v1`
- **Resource Naming:** Lowercase, pluralized nouns (e.g., `/products`, `/orders`, `/categories`).
- **HTTP Methods:**
  - `GET`: Retrieve resources (idempotent, safe).
  - `POST`: Create resource or execute commerce commands (e.g., checkout, initiate payment).
  - `PATCH`: Partially update existing resources.
  - `DELETE`: Remove or deactivate resources.

---

## 2. Standardized Response Format

All API responses are wrapped by `TransformInterceptor`:

### Success Response

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "prod_123",
    "title": "Classic Cotton T-Shirt",
    "pricePaise": 99900
  },
  "timestamp": "2026-11-05T10:00:00.000Z"
}
```

### Error Response

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "path": "phone",
      "message": "Invalid Indian mobile phone number (+91)"
    }
  ],
  "path": "/api/v1/customers",
  "timestamp": "2026-11-05T10:00:00.000Z"
}
```

---

## 3. Pagination Conventions

List endpoints accept standard query parameters:

- `page`: 1-based page index (default: `1`)
- `limit`: Number of items per page (default: `20`, max: `100`)

Response payload:

```json
{
  "items": [...],
  "total": 142,
  "page": 1,
  "limit": 20,
  "totalPages": 8
}
```
