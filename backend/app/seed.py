from sqlalchemy import select
from sqlalchemy.orm import Session

from app import models
from app.security import hash_password


SEED_USERS = [
    {
        "full_name": "Admin Demo",
        "email": "admin@pspdemo.com",
        "password": "admin123",
    },
    {
        "full_name": "Ana Equipo",
        "email": "ana@pspdemo.com",
        "password": "equipo123",
    },
    {
        "full_name": "Carlos Manuel",
        "email": "carlos@pspdemo.com",
        "password": "suplemento123",
    },
    {
        "full_name": "Daniela Mireles",
        "email": "daniela@pspdemo.com",
        "password": "energia123",
    },
    {
        "full_name": "Erick Dominguez",
        "email": "erick@pspdemo.com",
        "password": "proteina123",
    },
]

SEED_PRODUCTS = [
    {
        "name": "Proteina Whey Vainilla 1kg",
        "description": "Suplemento de proteina concentrada sabor vainilla para recuperacion muscular.",
        "price": 38.5,
        "stock": 18,
    },
    {
        "name": "Creatina Monohidratada 300g",
        "description": "Creatina pura micronizada para mejorar rendimiento en entrenamientos de alta intensidad.",
        "price": 24.9,
        "stock": 26,
    },
    {
        "name": "BCAA 2:1:1 400g",
        "description": "Aminoacidos ramificados para apoyo en recuperacion y resistencia.",
        "price": 21.0,
        "stock": 14,
        "is_active": True,
    },
    {
        "name": "Pre-Entreno Energy Blast 300g",
        "description": "Formula energizante con cafeina para sesiones de entrenamiento exigentes.",
        "price": 29.5,
        "stock": 11,
    },
    {
        "name": "Glutamina Micronizada 500g",
        "description": "Glutamina en polvo para soporte muscular y recuperacion post entrenamiento.",
        "price": 19.9,
        "stock": 20,
    },
    {
        "name": "Omega 3 Concentrado 120 capsulas",
        "description": "Acidos grasos esenciales EPA y DHA para salud cardiovascular y bienestar general.",
        "price": 17.5,
        "stock": 30,
    },
    {
        "name": "Multivitaminico Diario 90 tabletas",
        "description": "Complejo de vitaminas y minerales para complementar la dieta diaria.",
        "price": 16.8,
        "stock": 25,
    },
    {
        "name": "Proteina Isolada Chocolate 900g",
        "description": "Proteina aislada de rapida absorcion sabor chocolate.",
        "price": 42.0,
        "stock": 9,
    },
    {
        "name": "Colageno Hidrolizado 400g",
        "description": "Suplemento de colageno con vitamina C para articulaciones y piel.",
        "price": 23.4,
        "stock": 16,
    },
    {
        "name": "Caseina Nocturna 1kg",
        "description": "Proteina de absorcion lenta ideal para consumo nocturno.",
        "price": 36.7,
        "stock": 0,
        "is_active": True,
    },
]


def seed_database(db: Session) -> None:
    existing_user = db.scalar(select(models.User.id).limit(1))
    if existing_user:
        return

    for user_data in SEED_USERS:
        db.add(
            models.User(
                full_name=user_data["full_name"],
                email=user_data["email"].lower(),
                password_hash=hash_password(user_data["password"]),
            )
        )

    for product_data in SEED_PRODUCTS:
        db.add(models.Product(**product_data))

    db.commit()
