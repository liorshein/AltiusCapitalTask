# Testing Guide

This document describes the comprehensive testing setup for both frontend and backend components.

## Overview

The project includes:
- **Frontend E2E Tests**: Playwright-based browser automation tests
- **Backend Unit Tests**: Isolated component testing with pytest
- **Backend Integration Tests**: API endpoint testing
- **Backend E2E Tests**: Full workflow testing
- **CI/CD Integration**: Automated testing in GitHub Actions

## Frontend Testing (Playwright)

### Setup
```bash
cd frontend
npm install
npx playwright install
```

### Environment Variables
Set up your test credentials:
```bash
export TEST_USERNAME=your-username@example.com
export TEST_PASSWORD=your-password
```

### Running Tests
```bash
# Run all e2e tests with real credentials
TEST_USERNAME=your-username@example.com TEST_PASSWORD=your-password npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# Run tests in headed mode (visible browser)
npm run test:e2e:headed
```

### Test Structure
- `tests/e2e/auth.spec.ts` - Authentication flow tests
- `tests/e2e/deals.spec.ts` - Deals management tests
- `tests/e2e/navigation.spec.ts` - UI and navigation tests

### Test Coverage
- User authentication (login/logout)
- Deal listing and filtering
- Download functionality
- Error handling
- Responsive design
- Accessibility

## Backend Testing (pytest)

### Setup
```bash
cd backend
pip install -r requirements.txt
```

### Running Tests
```bash
# Run all tests
python run_tests.py

# Run specific test types
python run_tests.py --unit
python run_tests.py --integration
python run_tests.py --e2e

# Run with coverage
python run_tests.py --coverage

# Run with verbose output
python run_tests.py --verbose
```

### Test Structure
- `tests/unit/` - Unit tests for individual components
- `tests/integration/` - API endpoint integration tests
- `tests/e2e/` - Full workflow end-to-end tests
- `tests/conftest.py` - Shared test configuration and fixtures

### Test Coverage
- Authentication service unit tests
- API endpoint integration tests
- Complete user journey workflows
- Error handling scenarios
- Security validation

## Test Configuration

### Frontend (playwright.config.ts)
- Multi-browser testing (Chrome, Firefox, Safari)
- Mobile device testing
- Automatic server startup
- Screenshot and video recording on failures
- Trace collection for debugging

### Backend (pytest.ini)
- Test discovery configuration
- Async test support
- Custom markers for test categorization
- Coverage reporting

## CI/CD Integration

### GitHub Actions Workflow
The `.github/workflows/e2e-tests.yml` file defines:

1. **Backend Tests Job**
   - Unit tests with coverage
   - Integration tests
   - E2E tests

2. **Frontend Tests Job**
   - Playwright test execution
   - Artifact upload for reports

3. **Full E2E Tests Job**
   - Combined frontend/backend testing
   - Real server integration
   - Complete workflow validation

### Artifacts
- Playwright HTML reports
- Test videos and screenshots
- Coverage reports
- Test result summaries

## Writing New Tests

### Frontend (Playwright)
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup code
  });

  test('should do something', async ({ page }) => {
    // Test implementation
  });
});
```

### Backend (pytest)
```python
import pytest

@pytest.mark.unit  # or integration, e2e
class TestFeature:
    def test_something(self, client, mock_data):
        # Test implementation
        pass
```

## Best Practices

### Frontend Testing
- Mock API responses for consistent testing
- Use data-testid attributes for element selection
- Test critical user workflows
- Include error scenarios
- Test responsive design

### Backend Testing
- Use fixtures for common test data
- Mock external dependencies
- Test both success and failure paths
- Include security validations
- Test async operations properly

### General
- Write descriptive test names
- Keep tests isolated and independent
- Use appropriate test markers
- Include setup and teardown as needed
- Document complex test scenarios

## Troubleshooting

### Common Issues
- **Browser not found**: Run `npx playwright install`
- **Import errors**: Check Python virtual environment
- **API connection errors**: Verify server is running
- **Test timeouts**: Increase timeout or optimize test setup

### Debug Mode
- Frontend: Use `--headed` and `--debug` flags
- Backend: Use `-v` and `-s` flags with pytest
- Enable trace collection for detailed debugging

## Continuous Improvement

- Review test coverage regularly
- Add tests for new features
- Update tests when requirements change
- Monitor test execution times
- Optimize slow-running tests