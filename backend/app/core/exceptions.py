from typing import Any


class AppError(Exception):
    def __init__(
        self,
        code: str,
        message: str,
        status: int,
        details: dict[str, Any] | None = None,
    ) -> None:
        self.code = code
        self.message = message
        self.status = status
        self.details = details or {}

        super().__init__(message)


class UnauthenticatedError(AppError):
    def __init__(
        self,
        message: str = "Authentication required",
        details: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(
            code="UNAUTHENTICATED",
            message=message,
            status=401,
            details=details,
        )


class ForbiddenError(AppError):
    def __init__(
        self,
        message: str = "Forbidden",
        details: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(
            code="FORBIDDEN",
            message=message,
            status=403,
            details=details,
        )


class ValidationError(AppError):
    def __init__(
        self,
        message: str = "Validation error",
        details: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(
            code="VALIDATION_ERROR",
            message=message,
            status=422,
            details=details,
        )


class InvalidAddressError(AppError):
    def __init__(
        self,
        message: str = "Invalid address",
        details: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(
            code="INVALID_ADDRESS",
            message=message,
            status=400,
            details=details,
        )


class ChainUnsupportedError(AppError):
    def __init__(
        self,
        message: str = "Chain unsupported",
        details: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(
            code="CHAIN_UNSUPPORTED",
            message=message,
            status=400,
            details=details,
        )


class CaseNotFoundError(AppError):
    def __init__(
        self,
        message: str = "Case not found",
        details: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(
            code="CASE_NOT_FOUND",
            message=message,
            status=404,
            details=details,
        )


class WalletNotFoundError(AppError):
    def __init__(
        self,
        message: str = "Wallet not found",
        details: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(
            code="WALLET_NOT_FOUND",
            message=message,
            status=404,
            details=details,
        )


class TraceInProgressError(AppError):
    def __init__(
        self,
        message: str = "Trace already in progress",
        details: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(
            code="TRACE_IN_PROGRESS",
            message=message,
            status=409,
            details=details,
        )


class UpstreamRateLimitedError(AppError):
    def __init__(
        self,
        message: str = "Upstream rate limited",
        details: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(
            code="UPSTREAM_RATE_LIMITED",
            message=message,
            status=429,
            details=details,
        )


class UpstreamUnavailableError(AppError):
    def __init__(
        self,
        message: str = "Upstream unavailable",
        details: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(
            code="UPSTREAM_UNAVAILABLE",
            message=message,
            status=503,
            details=details,
        )


class NoticeNotEditableError(AppError):
    def __init__(
        self,
        message: str = "Notice is not editable",
        details: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(
            code="NOTICE_NOT_EDITABLE",
            message=message,
            status=409,
            details=details,
        )


class ReportGenerationFailedError(AppError):
    def __init__(
        self,
        message: str = "Report generation failed",
        details: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(
            code="REPORT_GENERATION_FAILED",
            message=message,
            status=500,
            details=details,
        )