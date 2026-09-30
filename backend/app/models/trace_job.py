from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, IDMixin
from app.schemas.common import JobStatus


class TraceJob(Base, IDMixin):
    __tablename__ = "trace_jobs"

    complaint_id: Mapped[str] = mapped_column(
        String(64),
        nullable=False,
        index=True,
    )

    case_id: Mapped[str | None] = mapped_column(
        String(64),
        nullable=True,
        index=True,
    )

    status: Mapped[JobStatus] = mapped_column(
        String(50),
        nullable=False,
        index=True,
    )

    stage: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    progress: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    error: Mapped[str | None] = mapped_column(
        String(1000),
        nullable=True,
    )