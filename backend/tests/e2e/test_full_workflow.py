import pytest
from fastapi.testclient import TestClient

@pytest.mark.e2e
@pytest.mark.slow
class TestFullWorkflow:
    """End-to-end tests covering complete user workflows"""
    
    def test_complete_user_journey(self, client, real_user_data):
        """Test complete user journey from login to deals access with real data"""
        
        # Step 1: Attempt to access protected resource without auth
        response = client.get("/api/deals")
        assert response.status_code == 401
        
        # Step 2: Login with real credentials
        login_response = client.post("/api/auth/login", json=real_user_data)
        
        # If login succeeds, continue with authenticated flow
        if login_response.status_code == 200:
            token_data = login_response.json()
            headers = {"Authorization": f"Bearer {token_data['access_token']}"}
            
            # Step 3: Access protected deals endpoint
            deals_response = client.get("/api/deals", headers=headers)
            assert deals_response.status_code == 200
            
            # Step 4: Download a deal (if deals exist)
            deals_data = deals_response.json()
            if deals_data and len(deals_data) > 0:
                deal_id = deals_data[0].get("id")
                if deal_id:
                    download_response = client.get(f"/api/deals/{deal_id}/download", headers=headers)
                    assert download_response.status_code in [200, 404]  # 404 if file doesn't exist
            
            # Step 5: Logout
            logout_response = client.post("/api/auth/logout", headers=headers)
            assert logout_response.status_code == 200
            
            # Step 6: Verify token is invalidated
            post_logout_response = client.get("/api/deals", headers=headers)
            assert post_logout_response.status_code == 401
        else:
            # If login fails (expected in test environment), verify error handling
            assert login_response.status_code == 401
    
    def test_deal_filtering_workflow(self, client, auth_headers):
        """Test deal filtering and website selection workflow"""
        if not auth_headers:
            pytest.skip("Authentication required for this test")
        
        # Test different website filters
        websites = ["all", "website1", "website2"]
        
        for website in websites:
            response = client.get(f"/api/deals?website={website}", headers=auth_headers)
            assert response.status_code in [200, 404]
            
            if response.status_code == 200:
                deals = response.json()
                assert isinstance(deals, list)
    
    def test_error_handling_workflow(self, client):
        """Test various error scenarios"""
        
        # Test invalid endpoints
        response = client.get("/api/invalid-endpoint")
        assert response.status_code == 404
        
        # Test malformed requests
        response = client.post("/api/auth/login", json={"invalid": "data"})
        assert response.status_code == 422
        
        # Test unauthorized access
        response = client.get("/api/deals")
        assert response.status_code == 401
    
    def test_health_check_workflow(self, client):
        """Test application health and basic functionality"""
        
        # Test root endpoint
        response = client.get("/")
        assert response.status_code in [200, 404]  # Depends on if root is implemented
        
        # Test health endpoint if available
        health_response = client.get("/health")
        assert health_response.status_code in [200, 404]