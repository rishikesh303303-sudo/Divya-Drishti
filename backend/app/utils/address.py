import re

from app.core.exceptions import InvalidAddressError
from app.schemas.common import Chain


EVM_PATTERN = re.compile(r"^0x[0-9a-fA-F]{40}$")
TRON_PATTERN = re.compile(r"^T[1-9A-HJ-NP-Za-km-z]{33}$")
BITCOIN_PATTERN = re.compile(
    r"^(bc1[a-zA-HJ-NP-Z0-9]{6,87}|[13][1-9A-HJ-NP-Za-km-z]{24,33})$"
)


def normalize_address(address: str, chain: Chain) -> str:
    """
    Return the canonical address representation.

    EVM addresses are stored lowercase.
    TRON and Bitcoin addresses are preserved as supplied.
    """
    value = address.strip()

    if not value:
        raise InvalidAddressError("Address cannot be empty")

    if chain in {
        Chain.ETHEREUM,
        Chain.BSC,
        Chain.POLYGON,
        Chain.ETH_SEPOLIA,
    }:
        if not EVM_PATTERN.fullmatch(value):
            raise InvalidAddressError("Invalid EVM address")

        return value.lower()

    if chain in {Chain.TRON, Chain.TRON_NILE}:
        if not TRON_PATTERN.fullmatch(value):
            raise InvalidAddressError("Invalid TRON address")

        return value

    if chain == Chain.BITCOIN:
        if not BITCOIN_PATTERN.fullmatch(value):
            raise InvalidAddressError("Invalid Bitcoin address")

        return value

    raise InvalidAddressError("Unsupported address chain")


def validate_address(address: str, chain: Chain) -> bool:
    """Validate an address without returning its normalized form."""
    normalize_address(address, chain)
    return True


def canonical_node_id(chain: Chain, address: str) -> str:
    """
    Build the canonical graph node ID.

    Format:
        {CHAIN}:{address}
    """
    normalized = normalize_address(address, chain)
    return f"{chain.value}:{normalized}"