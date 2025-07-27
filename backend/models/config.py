from typing import List
from pydantic import Field, computed_field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    secret_key: str = Field(default="your-secret-key-here")
    algorithm: str = Field(default="HS256")
    access_token_expire_minutes: int = Field(default=30)

    fo1_base_url: str = Field(default="https://fo1.api.altius.finance/api")
    fo2_base_url: str = Field(default="https://fo2.api.altius.finance/api")

    allowed_origins_str: str = Field(default="http://localhost:3000,http://localhost:5173", alias="ALLOWED_ORIGINS")

    model_config = {"env_file": ".env"}

    @computed_field
    @property
    def allowed_origins(self) -> List[str]:
        return [origin.strip() for origin in self.allowed_origins_str.split(",")]


settings = Settings()
