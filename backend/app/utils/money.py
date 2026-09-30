from decimal import Decimal, InvalidOperation


def to_decimal(value: str | int | Decimal) -> Decimal:
    """Convert a money value to Decimal without using float."""
    if isinstance(value, Decimal):
        return value

    try:
        return Decimal(str(value))
    except (InvalidOperation, ValueError) as exc:
        raise ValueError("Invalid decimal value") from exc


def decimal_to_string(value: Decimal) -> str:
    """Serialize Decimal money value as a decimal string."""
    return format(value, "f")


def usd_to_inr(
    amount_usd: Decimal,
    usd_inr_rate: Decimal,
) -> Decimal:
    """Convert USD amount to INR using the configured FX rate."""
    return amount_usd * usd_inr_rate


def group_inr(amount_inr: Decimal) -> str:
    """Format an INR amount using Indian digit grouping."""
    sign = "-" if amount_inr < 0 else ""
    value = abs(amount_inr)

    integer_part, _, fractional_part = format(value, "f").partition(".")

    if len(integer_part) <= 3:
        grouped = integer_part
    else:
        last_three = integer_part[-3:]
        remaining = integer_part[:-3]

        groups: list[str] = []

        while remaining:
            groups.insert(0, remaining[-2:])
            remaining = remaining[:-2]

        grouped = ",".join(groups + [last_three])

    if fractional_part:
        return f"{sign}{grouped}.{fractional_part}"

    return f"{sign}{grouped}"