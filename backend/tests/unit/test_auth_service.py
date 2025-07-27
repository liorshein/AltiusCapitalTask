import pytest
from unittest.mock import Mock, patch
from services.auth_service import AuthService
from models.exceptions import InvalidCredentialsError

class TestAuthService:
    
    @pytest.fixture
    def auth_service(self):
        return AuthService()
    
    @pytest.fixture
    def mock_user_data(self):
        return {
            "username": "test@example.com",
            "password": "testpassword123"
        }
    
    def test_hash_password(self, auth_service):
        """Test password hashing"""
        password = "testpassword123"
        hashed = auth_service.hash_password(password)
        
        assert hashed != password
        assert auth_service.verify_password(password, hashed)
    
    def test_verify_password_success(self, auth_service):
        """Test successful password verification"""
        password = "testpassword123"
        hashed = auth_service.hash_password(password)
        
        assert auth_service.verify_password(password, hashed) is True
    
    def test_verify_password_failure(self, auth_service):
        """Test failed password verification"""
        password = "testpassword123"
        wrong_password = "wrongpassword"
        hashed = auth_service.hash_password(password)
        
        assert auth_service.verify_password(wrong_password, hashed) is False
    
    @patch('services.auth_service.AuthService.get_user_by_username')
    def test_authenticate_user_success(self, mock_get_user, auth_service, mock_user_data):
        """Test successful user authentication"""
        hashed_password = auth_service.hash_password(mock_user_data["password"])
        mock_user = {
            "username": mock_user_data["username"],
            "hashed_password": hashed_password
        }
        mock_get_user.return_value = mock_user
        
        result = auth_service.authenticate_user(
            mock_user_data["username"], 
            mock_user_data["password"]
        )
        
        assert result == mock_user
        mock_get_user.assert_called_once_with(mock_user_data["username"])
    
    @patch('services.auth_service.AuthService.get_user_by_username')
    def test_authenticate_user_invalid_username(self, mock_get_user, auth_service):
        """Test authentication with invalid username"""
        mock_get_user.return_value = None
        
        with pytest.raises(InvalidCredentialsError):
            auth_service.authenticate_user("invalid@example.com", "password")
    
    @patch('services.auth_service.AuthService.get_user_by_username')
    def test_authenticate_user_invalid_password(self, mock_get_user, auth_service, mock_user_data):
        """Test authentication with invalid password"""
        hashed_password = auth_service.hash_password("correctpassword")
        mock_user = {
            "username": mock_user_data["username"],
            "hashed_password": hashed_password
        }
        mock_get_user.return_value = mock_user
        
        with pytest.raises(InvalidCredentialsError):
            auth_service.authenticate_user(
                mock_user_data["username"], 
                "wrongpassword"
            )