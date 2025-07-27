# Website Crawler API

A FastAPI backend service for authenticating with and crawling website data from fo1.altius.finance and fo2.altius.finance.

## Features

- ✅ Website authentication with fo1.altius.finance and fo2.altius.finance
- ✅ Session management with secure tokens
- ✅ Deal data fetching from authenticated websites
- ✅ Comprehensive error handling
- ✅ CORS support for frontend integration

## API Endpoints

### Authentication

- `POST /api/auth/login` - Authenticate with website credentials
- `POST /api/auth/validate` - Validate existing session
- `POST /api/auth/logout` - Logout and clear session
- `GET /api/auth/websites` - Get list of supported websites

### Data

- `GET /api/auth/deals` - Fetch deals from authenticated website

### Health

- `GET /` - API status
- `GET /health` - Health check

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Run the application:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Usage

### 1. Login Request

```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "website": "fo1",
    "email": "fo1_test_user@whatever.com",
    "password": "Test123!"
  }'
```

Response:
```json
{
  "success": true,
  "session_token": "your-session-token",
  "website": "fo1",
  "deals": [],
  "message": "Authentication successful"
}
```

### 2. Get Deals

```bash
curl -X GET "http://localhost:8000/api/auth/deals" \
  -H "Authorization: Bearer your-session-token"
```

### 3. Validate Session

```bash
curl -X POST "http://localhost:8000/api/auth/validate" \
  -H "Authorization: Bearer your-session-token"
```

## Test Credentials

### FO1 Website
- URL: fo1.altius.finance
- Email: fo1_test_user@whatever.com
- Password: Test123!

### FO2 Website  
- URL: fo2.altius.finance
- Email: fo2_test_user@whatever.com
- Password: Test223!

## Project Structure

```
app/
├── __init__.py
├── main.py              # FastAPI app entry point
├── config.py            # Configuration settings
├── exceptions.py        # Custom exception handlers
├── models/
│   ├── __init__.py
│   └── auth.py          # Pydantic models
├── services/
│   ├── __init__.py
│   ├── auth_service.py  # Website authentication logic
│   └── session_manager.py # Session management
└── routers/
    ├── __init__.py
    └── auth.py          # Authentication endpoints
```

## Development

Run with auto-reload:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000` with interactive docs at `http://localhost:8000/docs`.

## Error Handling

The API includes comprehensive error handling for:
- Invalid credentials (401)
- Website connection issues (503)
- Session expiration (401)
- Unsupported websites (400)

## Security

- Session tokens are generated using cryptographically secure random numbers
- Passwords are never stored, only used for authentication
- Sessions automatically expire after 24 hours
- CORS is configured for secure frontend integration