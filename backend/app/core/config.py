from decimal import Decimal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_ENV: str = "dev"
    DEMO_MODE: bool = True
    OFFLINE_MODE: bool = False
    GRAPH_BACKEND: str = "memory"

    # Application URLs
    BACKEND_BASE_URL: str = "http://localhost:8000"

    # Database / Redis
    DATABASE_URL: str
    REDIS_URL: str

    # Neo4j
    NEO4J_URI: str | None = None
    NEO4J_USER: str | None = None
    NEO4J_PASSWORD: str | None = None

    # Authentication
    JWT_SECRET: str
    JWT_ACCESS_MIN: int = 15

    # External chain / data providers
    TRONGRID_API_KEY: str | None = None
    EVM_EXPLORER_API_KEY: str | None = None
    BITCOIN_API_BASE: str = "https://mempool.space/api"
    CHAINABUSE_API_KEY: str | None = None

    # LLM configuration
    LLM_API_KEY: str | None = None
    LLM_MODEL: str | None = None

    # Pricing
    USD_INR_RATE: Decimal | None = None

    # Tracing
    TRACE_MAX_DEPTH: int = 6
    TRACE_MAX_NODES: int = 500
    TRACE_MIN_USD: Decimal = Decimal("1")

    # Attribution / sweep detection
    SWEEP_WINDOW_MIN: int = 30
    SWEEP_MIN_FORWARD_RATIO: Decimal = Decimal("0.9")

    # Bridge matching
    BRIDGE_MATCH_WINDOW_MIN: int = 30
    BRIDGE_AMOUNT_TOL: Decimal = Decimal("0.01")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()