from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, IDMixin


class AttributionFeedback(Base, IDMixin):
    __tablename__ = "attribution_feedback"

    case_id: Mapped[str] = mapped_column(
        String(64),
        ForeignKey("cases.id"),
        nullable=False,
        index=True,
    )

    vasp_id: Mapped[str] = mapped_column(
        String(64),
        ForeignKey("vasps.id"),
        nullable=False,
        index=True,
    )

    verdict: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    note: Mapped[str | None] = mapped_column(
        String(2000),
        nullable=True,
    )

    user_id: Mapped[str] = mapped_column(
        String(64),
        nullable=False,
        index=True,
    )