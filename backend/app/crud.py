from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app import models, schemas


def create_user(db: Session, payload: schemas.UserCreate, password_hash: str) -> models.User:
    user = models.User(full_name=payload.full_name, email=payload.email.lower(), password_hash=password_hash)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_user_by_email(db: Session, email: str) -> models.User | None:
    stmt = select(models.User).where(models.User.email == email.lower())
    return db.scalar(stmt)


def get_user_by_id(db: Session, user_id: int) -> models.User | None:
    stmt = select(models.User).where(models.User.id == user_id)
    return db.scalar(stmt)


def list_users(db: Session) -> list[models.User]:
    stmt = select(models.User).order_by(models.User.id.asc())
    return list(db.scalars(stmt).all())


def create_product(db: Session, payload: schemas.ProductCreate) -> models.Product:
    product = models.Product(
        name=payload.name.strip(),
        description=payload.description.strip(),
        price=payload.price,
        stock=payload.stock,
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def get_product_by_id(db: Session, product_id: int) -> models.Product | None:
    stmt = select(models.Product).where(models.Product.id == product_id)
    return db.scalar(stmt)


def list_products(db: Session, include_inactive: bool = True) -> list[models.Product]:
    stmt = select(models.Product).order_by(models.Product.id.asc())
    if not include_inactive:
        stmt = stmt.where(models.Product.is_active.is_(True))
    return list(db.scalars(stmt).all())


def update_product(db: Session, product: models.Product, payload: schemas.ProductUpdate) -> models.Product:
    updates = payload.model_dump(exclude_unset=True)
    for key, value in updates.items():
        setattr(product, key, value)

    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def delete_product(db: Session, product: models.Product) -> None:
    db.delete(product)
    db.commit()


def dashboard_summary(db: Session) -> dict[str, int]:
    users_total = db.scalar(select(func.count()).select_from(models.User)) or 0
    products_total = db.scalar(select(func.count()).select_from(models.Product)) or 0
    active_products = (
        db.scalar(select(func.count()).select_from(models.Product).where(models.Product.is_active.is_(True))) or 0
    )
    low_stock_products = (
        db.scalar(
            select(func.count()).select_from(models.Product).where(models.Product.is_active.is_(True), models.Product.stock < 5)
        )
        or 0
    )

    return {
        "users_total": int(users_total),
        "products_total": int(products_total),
        "active_products": int(active_products),
        "low_stock_products": int(low_stock_products),
    }


def dashboard_stock_alerts(db: Session, threshold: int = 5) -> list[dict[str, int | str]]:
    stmt = (
        select(models.Product)
        .where(models.Product.is_active.is_(True), models.Product.stock < threshold)
        .order_by(models.Product.stock.asc(), models.Product.updated_at.desc())
    )
    products = list(db.scalars(stmt).all())

    return [
        {
            "product_id": product.id,
            "product_name": product.name,
            "stock": product.stock,
            "status": "Activo" if product.is_active else "Inactivo",
        }
        for product in products
    ]


def dashboard_recent_products(db: Session, limit: int = 5) -> list[dict[str, int | str | float]]:
    stmt = select(models.Product).order_by(models.Product.updated_at.desc()).limit(limit)
    products = list(db.scalars(stmt).all())

    return [
        {
            "product_id": product.id,
            "product_name": product.name,
            "price": product.price,
            "created_at": product.created_at,
        }
        for product in products
    ]

