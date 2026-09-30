from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, JSON, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, IDMixin


class CaseEvent(Base, IDMixin):
    __tablename__ = "case_events"

    case_id: Mapped[str] = mapped_column(
        String(64),
        ForeignKey("cases.id"),
        nullable=False,
        index=True,
    )

    type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    payload: Mapped[dict | None] = mapped_column(
        JSON,
        nullable=True,
    )

    at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    actor: Mapped[str | None] = mapped_column(
        String(64),
        nullable=True,
    )