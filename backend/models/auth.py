from enum import Enum
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field

class WebsiteEnum(str, Enum):
    FO1 = "fo1"
    FO2 = "fo2"

class LoginRequest(BaseModel):
    website: WebsiteEnum = Field(..., description="The website to authenticate with")
    email: str = Field(..., min_length=1, description="Email for authentication")
    password: str = Field(..., min_length=1, description="Password for authentication")

class LoginResponse(BaseModel):
    success: bool = Field(..., description="Whether authentication was successful")
    website: WebsiteEnum = Field(..., description="The website that was authenticated")
    message: Optional[str] = Field(None, description="Response message")

class SessionData(BaseModel):
    website: WebsiteEnum
    email: str
    cookies: Dict[str, Any]
    authenticated_at: str
    expires_at: Optional[str] = None

class ErrorResponse(BaseModel):
    error: str = Field(..., description="Error message")
    detail: Optional[str] = Field(None, description="Detailed error information")
    status_code: int = Field(..., description="HTTP status code")