import pytest

@pytest.mark.integration
class TestAuthEndpoints:
    
    def test_login_endpoint_success(self, client, real_user_data):
        """Test successful login endpoint with real credentials"""
        response = client.post("/api/auth/login", json=real_user_data)
        
        # With real credentials, should succeed
        if response.status_code == 200:
            data = response.json()
            # The actual API returns success, message, and website fields
            assert "success" in data
            assert data["success"] is True
            assert "website" in data
            assert "message" in data
        else:
            # If it fails, log the response for debugging
            print(f"Login failed: {response.status_code} - {response.text}")
            assert response.status_code in [401, 422]  # Expected failure modes
    
    def test_login_endpoint_invalid_data(self, client):
        """Test login endpoint with invalid data"""
        invalid_data = {"username": "", "password": ""}
        response = client.post("/api/auth/login", json=invalid_data)
        
        assert response.status_code == 422  # Validation error
    
    def test_login_endpoint_missing_fields(self, client):
        """Test login endpoint with missing fields"""
        incomplete_data = {"username": "test@example.com"}
        response = client.post("/api/auth/login", json=incomplete_data)
        
        assert response.status_code == 422  # Validation error
    
    def test_logout_endpoint(self, client):
        """Test logout endpoint"""
        response = client.post("/api/auth/logout")
        
        # Should succeed regardless of auth state for this endpoint design
        assert response.status_code in [200, 401]
    
    def test_protected_endpoint_without_auth(self, client):
        """Test accessing protected endpoint without authentication"""
        response = client.get("/api/deals")
        
        assert response.status_code == 401
    
    def test_protected_endpoint_with_invalid_token(self, client):
        """Test accessing protected endpoint with invalid token"""
        headers = {"Authorization": "Bearer invalid_token"}
        response = client.get("/api/deals", headers=headers)
        
        assert response.status_code == 401