from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.db import Base, SessionLocal, engine
from app.routers import auth, dashboard, products, users
from app.seed import seed_database

settings = get_settings()


def bootstrap_database() -> None:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed_database(db)


@asynccontextmanager
async def lifespan(_: FastAPI):
    bootstrap_database()
    yield


app = FastAPI(title=settings.app_name, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix=settings.api_prefix)
app.include_router(users.router, prefix=settings.api_prefix)
app.include_router(products.router, prefix=settings.api_prefix)
app.include_router(dashboard.router, prefix=settings.api_prefix)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "PSP Practica CRUD API operativa"}

