# VibeKit API Usage Guide

This guide explains **how to use the API** with practical examples. For a full list of endpoints, see [api-reference.md](./api-reference.md).

---

## 1. API Endpoint Structure
- All API endpoints are under `/api/` (e.g., `/api/organizations`, `/api/profile`, etc.)
- Endpoints follow RESTful conventions: use GET, POST, PUT, DELETE as appropriate
- See `frontend backend contract map.md` for a full list of endpoints

---

## 2. Request & Response Conventions
- **Request bodies** are JSON (for POST/PUT)
- **Responses** are JSON and always typed (see `types/app/`)
- **Validation:** All inputs/outputs are validated with Zod; invalid requests return 400 with error details

---

## 3. Authentication
- Protected endpoints require authentication
- Use the `requireAuth` utility in backend handlers
- If not authenticated, API returns:
  ```json
  { "error": { "code": "UNAUTHORIZED", "message": "Unauthorized" } }
  ```
- Auth/session is managed via cookies (see Supabase/NextAuth integration in the app)

---

## 4. Error Handling
- All errors use a standardized schema:
  ```json
  { "error": { "code": "ERROR_CODE", "message": "Human-readable error message." } }
  ```
- Common error codes: `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `VALIDATION_ERROR`, `INTERNAL_ERROR`, etc.
- Always check for an `error` field in the response

---

## 5. Rate Limiting
- All API responses include rate limit headers:
  - `X-RateLimit-Limit`: Max requests per window
  - `X-RateLimit-Remaining`: Requests left in current window
  - `X-RateLimit-Reset`: Seconds until rate limit resets
- If rate limit is exceeded, API returns 429 with error:
  ```json
  { "error": { "code": "RATE_LIMIT_EXCEEDED", "message": "Too many requests. Please try again later." } }
  ```

---

## 6. Example Requests & Responses

### GET (fetch data)
```
GET /api/organizations
Response:
{
  "organizations": [
    { "id": "org1", "name": "Acme Inc", "createdAt": "2024-01-01T00:00:00Z" }
  ]
}
```

### POST (create resource)
```
POST /api/teams/invite
Content-Type: application/json
Body:
{
  "email": "user@example.com",
  "teamId": "team1"
}
Response:
{
  "success": true
}
```

### PUT (update resource)
```
PUT /api/profile
Content-Type: application/json
Body:
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
Response:
{
  "profile": {
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

### DELETE (delete resource)
```
DELETE /api/pages/123
Response:
{
  "success": true
}
```

### Error Response
```
{
  "error": { "code": "VALIDATION_ERROR", "message": "Missing required field: email" }
}
```

### Auth Required Example
```
GET /api/profile
Response (if not authenticated):
{
  "error": { "code": "UNAUTHORIZED", "message": "Unauthorized" }
}
```

### Rate Limit Example
```
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 60
Content-Type: application/json

{
  "error": { "code": "RATE_LIMIT_EXCEEDED", "message": "Too many requests. Please try again later." }
}
```

---

## 7. Extending the API
- Add new endpoints in `app/api/` following the same conventions
- Define request/response types in `types/app/`
- Add Zod validation for all inputs/outputs
- Use `requireAuth` for protected endpoints
- Document new endpoints in this file and in the contract map

---

**For more details, see the API contract in `frontend backend contract map.md` and the backend overview in `BACKEND_OVERVIEW.md`.** 