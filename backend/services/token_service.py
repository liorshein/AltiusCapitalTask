import jwt
import json
from datetime import datetime, timedelta, timezone
from typing import Dict, Any
from models.auth import SessionData, WebsiteEnum
from exceptions import SessionExpiredException
from config import settings


class TokenService:
    def __init__(self):
        self.secret_key = getattr(settings, 'jwt_secret_key', 'your-secret-key-change-in-production')
        self.algorithm = 'HS256'
        self.expiry_hours = 24

    def create_token(self, session_data: SessionData) -> str:
        """Create a JWT token containing session data"""
        expires_at = datetime.now(timezone.utc) + timedelta(hours=self.expiry_hours)
        
        payload = {
            'website': session_data.website.value,
            'email': session_data.email,
            'cookies': session_data.cookies,
            'authenticated_at': session_data.authenticated_at,
            'exp': expires_at,
            'iat': datetime.now(timezone.utc)
        }
        
        return jwt.encode(payload, self.secret_key, algorithm=self.algorithm)

    def verify_token(self, token: str) -> SessionData:
        """Verify JWT token and return session data"""
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            
            return SessionData(
                website=WebsiteEnum(payload['website']),
                email=payload['email'],
                cookies=payload['cookies'],
                authenticated_at=payload['authenticated_at'],
                expires_at=payload['exp']
            )
            
        except jwt.ExpiredSignatureError:
            raise SessionExpiredException("Token has expired")
        except jwt.InvalidTokenError:
            raise SessionExpiredException("Invalid token")


token_service = TokenService()