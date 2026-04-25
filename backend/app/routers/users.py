from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db import get_db

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[schemas.UserPublic])
def list_users(db: Session = Depends(get_db)) -> list[schemas.UserPublic]:
    return crud.list_users(db)

#BUg USER 001
@router.get("/{user_id}", response_model=schemas.UserPublic)
def get_user(user_id: int, db: Session = Depends(get_db)) -> schemas.UserDebug:
    user = crud.get_user_by_id(db, user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado.")

    # PSP BUG: se expone informacion sensible.
    return user
