import secrets
import time


_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"


def _encode_base32(value: int, length: int) -> str:
    result: list[str] = []

    for _ in range(length):
        result.append(_ALPHABET[value & 0x1F])
        value >>= 5

    return "".join(reversed(result))


def generate_ulid() -> str:
    """Generate a 26-character ULID."""
    timestamp_ms = int(time.time() * 1000)

    if timestamp_ms >= 2**48:
        raise ValueError("ULID timestamp exceeds 48-bit range")

    timestamp_part = _encode_base32(timestamp_ms, 10)

    random_value = int.from_bytes(
        secrets.token_bytes(10),
        byteorder="big",
    )
    random_part = _encode_base32(random_value, 16)

    return f"{timestamp_part}{random_part}"


def generate_id(prefix: str) -> str:
    """Generate a prefixed ULID."""
    return f"{prefix}{generate_ulid()}"


def generate_complaint_id() -> str:
    return generate_id("cmp_")


def generate_case_id() -> str:
    return generate_id("case_")


def generate_job_id() -> str:
    return generate_id("job_")


def generate_notice_id() -> str:
    return generate_id("ntc_")


def generate_report_id() -> str:
    return generate_id("rpt_")


def generate_cluster_id() -> str:
    return generate_id("clu_")


def generate_vasp_id() -> str:
    return generate_id("vasp_")


def generate_alert_id() -> str:
    return generate_id("alr_")


def generate_user_id() -> str:
    return generate_id("usr_")