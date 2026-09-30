import json
from collections.abc import AsyncIterator
from typing import Any

from redis.asyncio import Redis

from app.core.config import settings


def create_redis() -> Redis:
    """Create a Redis client using the configured Redis URL."""
    return Redis.from_url(
        settings.REDIS_URL,
        decode_responses=True,
    )


async def publish(
    event: str,
    data: dict[str, Any],
    room: str | None = None,
) -> None:
    """Publish an application event through Redis pub/sub."""

    payload: dict[str, Any] = {
        "event": event,
        "data": data,
    }

    if room is not None:
        payload["room"] = room

    redis = create_redis()

    try:
        await redis.publish(
            "divya_drishti.events",
            json.dumps(payload, default=str),
        )
    finally:
        await redis.aclose()


async def subscribe() -> AsyncIterator[dict[str, Any]]:
    """Subscribe to application events from Redis."""

    redis = create_redis()
    pubsub = redis.pubsub()

    await pubsub.subscribe("divya_drishti.events")

    try:
        async for message in pubsub.listen():
            if message["type"] != "message":
                continue

            raw_data = message["data"]

            if not isinstance(raw_data, str):
                continue

            yield json.loads(raw_data)
    finally:
        await pubsub.unsubscribe("divya_drishti.events")
        await pubsub.aclose()
        await redis.aclose()