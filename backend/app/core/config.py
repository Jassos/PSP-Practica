from functools import lru_cache
from dataclasses import dataclass, field


@dataclass(frozen=True)
class Settings:
    app_name: str = "PSP Practica CRUD API"
    api_prefix: str = "/api"
    database_url: str = "sqlite:///./psp_practica.db"
    allow_origins: list[str] = field(default_factory=lambda: ["http://localhost:5173"])


@lru_cache
def get_settings() -> Settings:
    return Settings()

