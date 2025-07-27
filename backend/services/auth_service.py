import httpx
from typing import Dict
from datetime import datetime, timezone
from models.auth import WebsiteEnum, SessionData
from services.token_service import token_service
from models.exceptions import (
    InvalidCredentialsException,
    WebsiteConnectionException,
    UnsupportedWebsiteException
)
from config import settings

class WebsiteAuthService:
    def __init__(self):
        self.client = httpx.AsyncClient(timeout=30.0)
        self.website_configs = {
            WebsiteEnum.FO1: {
                "base_url": settings.fo1_base_url,
                "login_endpoint": "/v0.0.2/login",
            },
            WebsiteEnum.FO2: {
                "base_url": settings.fo2_base_url,
                "login_endpoint": "/v0.0.2/login",
            }
        }

    async def authenticate(self, website: WebsiteEnum, email: str, password: str) -> SessionData:
        if website not in self.website_configs:
            raise UnsupportedWebsiteException(f"Website {website} is not supported")

        config = self.website_configs[website]

        try:
            return await self._authenticate_website(website, email, password, config)
        except httpx.RequestError as e:
            raise WebsiteConnectionException(f"Failed to connect to {website}: {str(e)}")
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 401:
                raise InvalidCredentialsException("Invalid email or password")
            raise WebsiteConnectionException(f"HTTP error {e.response.status_code}")

    async def _authenticate_website(self, website: WebsiteEnum, email: str, password: str, config: Dict) -> SessionData:
        login_url = f"{config['base_url']}{config['login_endpoint']}"
        
        login_data = {
            "email": email,
            "password": password
        }
        
        response = await self.client.post(login_url, data=login_data)
        
        if response.status_code != 200:
            raise InvalidCredentialsException(f"Authentication failed for {website}")
        
        cookies = dict(response.cookies)
        if not cookies:
            raise InvalidCredentialsException("No authentication cookies received")
        
        session_data = SessionData(
            website=website,
            email=email,
            cookies=cookies,
            authenticated_at=datetime.now(timezone.utc).isoformat()
        )
        
        return session_data

auth_service = WebsiteAuthService()