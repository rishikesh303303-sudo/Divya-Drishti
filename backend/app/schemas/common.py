from enum import Enum
from typing import Any, Generic, TypeVar

from pydantic import BaseModel, Field


T = TypeVar("T")


class Chain(str, Enum):
    TRON = "TRON"
    ETHEREUM = "ETHEREUM"
    BSC = "BSC"
    POLYGON = "POLYGON"
    BITCOIN = "BITCOIN"
    TRON_NILE = "TRON_NILE"
    ETH_SEPOLIA = "ETH_SEPOLIA"


class FraudType(str, Enum):
    INVESTMENT_SCAM = "INVESTMENT_SCAM"
    TASK_FRAUD = "TASK_FRAUD"
    SEXTORTION = "SEXTORTION"
    RANSOMWARE = "RANSOMWARE"
    PHISHING = "PHISHING"
    DARKNET = "DARKNET"
    OTHER = "OTHER"


class CaseStatus(str, Enum):
    NEW = "NEW"
    TRACING = "TRACING"
    ATTRIBUTED = "ATTRIBUTED"
    NOTICE_SENT = "NOTICE_SENT"
    FROZEN = "FROZEN"
    CLOSED = "CLOSED"
    NEEDS_REVIEW = "NEEDS_REVIEW"


class NodeClass(str, Enum):
    VICTIM = "VICTIM"
    SUSPECT = "SUSPECT"
    INTERMEDIARY = "INTERMEDIARY"
    BURNER = "BURNER"
    VASP_HOT = "VASP_HOT"
    VASP_DEPOSIT = "VASP_DEPOSIT"
    MIXER = "MIXER"
    BRIDGE = "BRIDGE"
    DEX = "DEX"
    SANCTIONED = "SANCTIONED"
    UNKNOWN = "UNKNOWN"


class RiskLevel(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class FreezeWindow(str, Enum):
    OPEN = "OPEN"
    CLOSING = "CLOSING"
    LIKELY_CLOSED = "LIKELY_CLOSED"
    UNKNOWN = "UNKNOWN"


class PatternType(str, Enum):
    PEEL_CHAIN = "PEEL_CHAIN"
    FAN_OUT = "FAN_OUT"
    FAN_IN = "FAN_IN"
    ROUND_TRIP = "ROUND_TRIP"
    MIXER_TOUCH = "MIXER_TOUCH"
    RAPID_MOVEMENT = "RAPID_MOVEMENT"
    BRIDGE_HOP = "BRIDGE_HOP"
    SWAP_HOP = "SWAP_HOP"
    DEPOSIT_SWEEP = "DEPOSIT_SWEEP"


class EdgeType(str, Enum):
    TRANSFER = "TRANSFER"
    BRIDGE = "BRIDGE"
    SWAP = "SWAP"


class AlertType(str, Enum):
    FUNDS_MOVED = "FUNDS_MOVED"
    REACHED_VASP = "REACHED_VASP"
    MIXER_TOUCH = "MIXER_TOUCH"
    BRIDGE_HOP = "BRIDGE_HOP"
    NEW_LINKED_COMPLAINT = "NEW_LINKED_COMPLAINT"


class Severity(str, Enum):
    INFO = "INFO"
    WARNING = "WARNING"
    CRITICAL = "CRITICAL"


class NoticeStatus(str, Enum):
    DRAFT = "DRAFT"
    SENT = "SENT"
    ACKNOWLEDGED = "ACKNOWLEDGED"
    FROZEN = "FROZEN"
    REJECTED = "REJECTED"
    EXPIRED = "EXPIRED"


class Role(str, Enum):
    INVESTIGATOR = "INVESTIGATOR"
    SUPERVISOR = "SUPERVISOR"
    ADMIN = "ADMIN"
    VASP_OFFICER = "VASP_OFFICER"


class JobStatus(str, Enum):
    QUEUED = "QUEUED"
    RUNNING = "RUNNING"
    DONE = "DONE"
    FAILED = "FAILED"


class EvidenceType(str, Enum):
    LABEL = "LABEL"
    SWEEP_PATTERN = "SWEEP_PATTERN"
    CLUSTER = "CLUSTER"
    ML = "ML"
    SANCTIONS = "SANCTIONS"
    COMMUNITY_REPORT = "COMMUNITY_REPORT"


class Page(BaseModel, Generic[T]):
    items: list[T]
    total: int
    page: int
    page_size: int


class ErrorDetail(BaseModel):
    code: str
    message: str
    details: dict[str, Any] = Field(default_factory=dict)


class ErrorEnvelope(BaseModel):
    error: ErrorDetail