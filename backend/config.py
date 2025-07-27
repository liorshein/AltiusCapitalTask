import os
from typing import List
from pydantic import BaseSettings


class Settings(BaseSettings):
    secret_key: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    algorithm: str = os.getenv("ALGORITHM", "HS256")
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

    fo1_base_url: str = os.getenv("FO1_BASE_URL", "https://fo1.api.altius.finance/api")
    fo2_base_url: str = os.getenv("FO2_BASE_URL", "https://fo2.api.altius.finance/api")

    allowed_origins: List[str] = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:5173").split(",")

class Config:
        env_file = ".env"


settings = Settings()
