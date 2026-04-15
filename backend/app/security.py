import hashlib
import secrets


def hash_password(password: str) -> str:
    salt = secrets.token_hex(8)
    digest = hashlib.sha256(f"{salt}:{password}".encode("utf-8")).hexdigest()
    return f"{salt}${digest}"


def verify_password(password: str, password_hash: str) -> bool:
    try:
        salt, digest = password_hash.split("$", maxsplit=1)
    except ValueError:
        return False

    candidate = hashlib.sha256(f"{salt}:{password}".encode("utf-8")).hexdigest()
    return secrets.compare_digest(candidate, digest)

