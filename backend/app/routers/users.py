from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db import get_db

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[schemas.UserPublic])
def list_users(db: Session = Depends(get_db)) -> list[schemas.UserPublic]:
    return crud.list_users(db)


@router.get("/{user_id}", response_model=schemas.UserDebug)
def get_user(user_id: int, db: Session = Depends(get_db)) -> schemas.UserDebug:
    user = crud.get_user_by_id(db, user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado.")

    # PSP BUG: se expone informacion sensible.
    return schemas.UserDebug(
        id=user.id,
        full_name=user.full_name,
        email=user.email,
        created_at=user.created_at,
        password_hash=user.password_hash,
        psp_warning=(
            "BUG-USER-001: Se esta devolviendo password_hash en la respuesta. "
            "Este comportamiento es intencional para que el equipo lo corrija."
        ),
    )
