from decimal import Decimal

from sqlalchemy import ForeignKey, JSON, Numeric, String, Table, Column
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, IDMixin, TimestampMixin
from app.schemas.common import CaseStatus, Chain, FraudType


case_complaints = Table(
    "case_complaints",
    Base.metadata,
    Column(
        "case_id",
        String(64),
        ForeignKey("cases.id"),
        primary_key=True,
    ),
    Column(
        "complaint_id",
        String(64),
        ForeignKey("complaints.id"),
        primary_key=True,
    ),
)


class Case(Base, IDMixin, TimestampMixin):
    __tablename__ = "cases"

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    primary_address: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )

    primary_chain: Mapped[Chain] = mapped_column(
        String(50),
        nullable=False,
    )

    status: Mapped[CaseStatus] = mapped_column(
        String(50),
        nullable=False,
        index=True,
    )

    victim_loss_inr: Mapped[Decimal] = mapped_column(
        Numeric(20, 2),
        nullable=False,
    )

    fraud_type: Mapped[FraudType] = mapped_column(
        String(50),
        nullable=False,
    )

    risk: Mapped[dict | None] = mapped_column(
        JSON,
        nullable=True,
    )

    typology: Mapped[dict | None] = mapped_column(
        JSON,
        nullable=True,
    )

    freeze_window: Mapped[dict | None] = mapped_column(
        JSON,
        nullable=True,
    )

    attribution: Mapped[dict | None] = mapped_column(
        JSON,
        nullable=True,
    )

    assigned_to: Mapped[str | None] = mapped_column(
        String(64),
        nullable=True,
    )

    snapshot_ref: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )