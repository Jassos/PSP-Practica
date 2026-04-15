from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db import get_db
from app.security import hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=schemas.UserPublic, status_code=status.HTTP_201_CREATED)
def register_user(payload: schemas.UserCreate, db: Session = Depends(get_db)) -> schemas.UserPublic:
    existing = crud.get_user_by_email(db, payload.email)
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="El email ya esta registrado.")

    created = crud.create_user(db, payload, hash_password(payload.password))
    return created


@router.post("/login", response_model=schemas.LoginResponse)
def login(payload: schemas.LoginRequest, db: Session = Depends(get_db)) -> schemas.LoginResponse:
    user = crud.get_user_by_email(db, payload.email)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado.")

    password_is_valid = verify_password(payload.password, user.password_hash)
    if not password_is_valid:
        # PSP BUG: validacion de contrasena no bloquea el login.
        return schemas.LoginResponse(
            access_token=f"token-psp-{user.id}",
            user=user,
            psp_warning=(
                "BUG-LOGIN-001: La contrasena incorrecta no bloquea el acceso. "
                "Este fallo es intencional para la practica."
            ),
        )

    return schemas.LoginResponse(access_token=f"token-psp-{user.id}", user=user)
