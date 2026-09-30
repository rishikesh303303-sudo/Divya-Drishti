from decimal import Decimal

from sqlalchemy import Boolean, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, IDMixin, TimestampMixin


class Vasp(Base, IDMixin, TimestampMixin):
    __tablename__ = "vasps"

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )

    jurisdiction: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    fiu_registered: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    contact_name: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    contact_email: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    avg_response_hours: Mapped[Decimal | None] = mapped_column(
        Numeric(10, 2),
        nullable=True,
    )