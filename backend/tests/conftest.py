import pytest
import asyncio
import os
import sys
from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

from httpx import AsyncClient, ASGITransport
from fastapi.testclient import TestClient
from main import app

@pytest.fixture
def client():
    """Test client for synchronous tests"""
    return TestClient(app)

@pytest.fixture
async def async_client():
    """Async test client for async tests"""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac

@pytest.fixture
def real_user_data():
    """Real user data for testing"""
    return {
        "website": "fo1",
        "email": os.getenv("TEST_USERNAME", "fo1_test_user@whatever.com"),
        "password": os.getenv("TEST_PASSWORD", "Test123!")
    }

@pytest.fixture
def auth_headers(client, real_user_data):
    """Generate auth headers for authenticated requests using real credentials"""
    try:
        response = client.post("/api/auth/login", json=real_user_data)
        if response.status_code == 200:
            # Try to extract token, but don't fail if format is different
            try:
                token_data = response.json()
                if "access_token" in token_data:
                    return {"Authorization": f"Bearer {token_data['access_token']}"}
            except:
                pass
            # If we can't get a token, return empty headers (cookie-based auth)
            return {}
        return {}
    except Exception:
        # If auth fails completely, return empty headers
        return {}

@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for the test session."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()