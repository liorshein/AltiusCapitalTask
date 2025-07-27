# Full Stack E2E Testing

This project uses a comprehensive end-to-end testing approach that runs the complete application stack together, similar to how docker-compose works.

## How It Works

The E2E testing workflow:

1. **Starts Backend Server** - Runs the FastAPI backend on port 8000
2. **Starts Frontend Server** - Runs the Vite frontend on port 5173  
3. **Runs Complete User Workflows** - Uses Playwright to test real user interactions
4. **Tears Down Everything** - Cleanly stops all servers

## GitHub Actions Workflow

The `.github/workflows/e2e-tests.yml` file defines a single job that:

- ✅ Sets up Python 3.12 and Node.js 20
- ✅ Installs all dependencies (backend + frontend)
- ✅ Starts backend server with health checks
- ✅ Starts frontend server with readiness checks
- ✅ Runs Playwright E2E tests against the full stack
- ✅ Captures logs and artifacts on failure
- ✅ Cleanly shuts down all processes

## Test Coverage

The E2E tests validate:

- **Authentication Flow**: Login, logout, error handling
- **Deals Management**: List display, filtering, downloads
- **Navigation & UI**: Responsive design, keyboard navigation
- **Real API Integration**: Actual backend/frontend communication
- **Error Scenarios**: Network failures, invalid credentials

## Configuration

### Environment Variables

Set these in GitHub Secrets:
- `TEST_USERNAME` - Valid test user email
- `TEST_PASSWORD` - Valid test user password

### Test Timeouts

Optimized for CI environments:
- Test timeout: 60 seconds
- Action timeout: 15 seconds  
- Navigation timeout: 30 seconds
- Server startup wait: 30 seconds each

## Debugging

On test failures, the workflow automatically captures:

- Backend server logs
- Frontend server logs  
- Process status information
- Network configuration
- Playwright test artifacts (videos, screenshots, traces)

## Benefits

✅ **Realistic Testing**: Tests the actual user experience
✅ **Full Stack Validation**: Ensures frontend/backend integration works
✅ **Single Source of Truth**: One test covers the complete workflow
✅ **CI/CD Ready**: Runs automatically on every push/PR
✅ **Easy Debugging**: Comprehensive failure artifacts

## Running Locally

The tests work the same way locally as in CI:

```bash
# Start backend
cd backend
uvicorn main:app --port 8000 &

# Start frontend  
cd frontend
npm run dev &

# Run tests
npm run test:e2e
```

The Playwright config automatically handles server startup for local development.