from redis.asyncio import Redis

from app.core.config import settings


def create_redis() -> Redis:
    """Create an async Redis client using the configured Redis URL."""
    return Redis.from_url(
        settings.REDIS_URL,
        decode_responses=True,
    )