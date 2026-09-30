from datetime import datetime, timezone
from zoneinfo import ZoneInfo


IST = ZoneInfo("Asia/Kolkata")


def utc_now() -> datetime:
    """Return the current UTC datetime."""
    return datetime.now(timezone.utc)


def to_utc(value: datetime) -> datetime:
    """Convert a datetime to timezone-aware UTC."""
    if value.tzinfo is None:
        value = value.replace(tzinfo=timezone.utc)

    return value.astimezone(timezone.utc)


def to_ist(value: datetime) -> datetime:
    """Convert a datetime to timezone-aware IST."""
    return to_utc(value).astimezone(IST)


def utc_now_iso() -> str:
    """Return current UTC time in ISO-8601 format ending with Z."""
    return format_utc_iso(utc_now())


def format_utc_iso(value: datetime) -> str:
    """Format a datetime as an ISO-8601 UTC string."""
    utc_value = to_utc(value)
    return utc_value.isoformat(timespec="seconds").replace("+00:00", "Z")


def parse_iso(value: str) -> datetime:
    """Parse an ISO-8601 timestamp string."""
    normalized = value.strip()

    if normalized.endswith("Z"):
        normalized = normalized[:-1] + "+00:00"

    parsed = datetime.fromisoformat(normalized)

    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)

    return parsed


def format_ist_iso(value: datetime) -> str:
    """Format a datetime converted to IST as ISO-8601."""
    return to_ist(value).isoformat(timespec="seconds")