from decimal import Decimal

from sqlalchemy import Boolean, Numeric, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, IDMixin, TimestampMixin
from app.schemas.common import Chain, NodeClass


class Label(Base, IDMixin, TimestampMixin):
    __tablename__ = "labels"

    __table_args__ = (
        UniqueConstraint(
            "chain",
            "address",
            "source",
            name="uq_labels_chain_address_source",
        ),
    )

    address: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )

    chain: Mapped[Chain] = mapped_column(
        String(50),
        nullable=False,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    node_class: Mapped[NodeClass] = mapped_column(
        String(50),
        nullable=False,
    )

    vasp_id: Mapped[str | None] = mapped_column(
        String(64),
        nullable=True,
        index=True,
    )

    source: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    confidence: Mapped[Decimal] = mapped_column(
        Numeric(5, 4),
        nullable=False,
    )

    verified: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    created_by: Mapped[str | None] = mapped_column(
        String(64),
        nullable=True,
    )