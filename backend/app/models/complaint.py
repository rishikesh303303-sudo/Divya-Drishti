from datetime import datetime
from decimal import Decimal

from sqlalchemy import DateTime, JSON, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, IDMixin, TimestampMixin
from app.schemas.common import Chain, FraudType


class Complaint(Base, IDMixin, TimestampMixin):
    __tablename__ = "complaints"

    ncrp_ack_no: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True,
    )

    victim_state: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    fraud_type: Mapped[FraudType] = mapped_column(
        String(50),
        nullable=False,
        index=True,
    )

    reported_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        index=True,
    )

    loss_inr: Mapped[Decimal] = mapped_column(
        Numeric(20, 2),
        nullable=False,
    )

    wallet_address: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )

    reported_chain: Mapped[Chain | None] = mapped_column(
        String(50),
        nullable=True,
    )

    txn_hash: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
        index=True,
    )

    status: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default="RECEIVED",
        index=True,
    )

    probe_result: Mapped[dict | None] = mapped_column(
        JSON,
        nullable=True,
    )

    cluster_id: Mapped[str | None] = mapped_column(
        String(64),
        nullable=True,
        index=True,
    )

    case_id: Mapped[str | None] = mapped_column(
        String(64),
        nullable=True,
        index=True,
    )

    source: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )