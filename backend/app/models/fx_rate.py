from datetime import datetime
from decimal import Decimal

from sqlalchemy import DateTime, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, IDMixin


class FxRate(Base, IDMixin):
    __tablename__ = "fx_rates"

    asset: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True,
    )

    usd: Mapped[Decimal] = mapped_column(
        Numeric,
        nullable=False,
    )

    inr: Mapped[Decimal] = mapped_column(
        Numeric,
        nullable=False,
    )

    at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        index=True,
    )