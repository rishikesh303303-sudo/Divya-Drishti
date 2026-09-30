import json
import logging
import sys
from contextvars import ContextVar
from typing import Any


_request_id: ContextVar[str | None] = ContextVar(
    "request_id",
    default=None,
)


class JsonFormatter(logging.Formatter):
    """Format log records as structured JSON."""

    def format(self, record: logging.LogRecord) -> str:
        payload: dict[str, Any] = {
            "level": record.levelname,
            "message": record.getMessage(),
        }

        request_id = _request_id.get()
        if request_id is not None:
            payload["request_id"] = request_id

        if record.name:
            payload["logger"] = record.name

        if record.exc_info:
            payload["exception"] = self.formatException(record.exc_info)

        return json.dumps(payload, default=str)


def set_request_id(request_id: str | None) -> None:
    """Set the request id for the current execution context."""
    _request_id.set(request_id)


def get_request_id() -> str | None:
    """Return the request id for the current execution context."""
    return _request_id.get()


def configure_logging() -> None:
    """Configure application logging with structured JSON output."""
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(JsonFormatter())

    root_logger = logging.getLogger()
    root_logger.handlers.clear()
    root_logger.addHandler(handler)
    root_logger.setLevel(logging.INFO)


def get_logger(name: str) -> logging.Logger:
    """Return a configured application logger."""
    return logging.getLogger(name)