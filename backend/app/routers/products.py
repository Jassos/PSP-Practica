from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db import get_db

router = APIRouter(prefix="/products", tags=["products"])


@router.post("", response_model=schemas.ProductMutationResponse, status_code=status.HTTP_201_CREATED)
def create_product(payload: schemas.ProductCreate, db: Session = Depends(get_db)) -> schemas.ProductMutationResponse:
    created = crud.create_product(db, payload)

    # PSP BUG: se trunca el precio a entero.
    created.price = int(created.price)
    db.add(created)
    db.commit()
    db.refresh(created)

    return schemas.ProductMutationResponse(
        product=created,
        psp_warning=(
            "BUG-CREATE-001: El precio se trunca a entero al guardar. "
            "Fallo de logica intencional."
        ),
    )


@router.get("", response_model=list[schemas.ProductPublic])
def list_products(
    include_inactive: bool = Query(default=True), db: Session = Depends(get_db)
) -> list[schemas.ProductPublic]:
    return crud.list_products(db, include_inactive=include_inactive)


@router.get("/{product_id}", response_model=schemas.ProductPublic)
def get_product(product_id: int, db: Session = Depends(get_db)) -> schemas.ProductPublic:
    product = crud.get_product_by_id(db, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado.")
    return product


@router.put("/{product_id}", response_model=schemas.ProductMutationResponse)
def update_product(
    product_id: int, payload: schemas.ProductUpdate, db: Session = Depends(get_db)
) -> schemas.ProductMutationResponse:
    product = crud.get_product_by_id(db, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado.")

    updates = payload.model_dump(exclude_unset=True)

    # PSP BUG: no permite modificar stock aunque el campo sea enviado.
    stock_received = "stock" in updates
    updates.pop("stock", None)

    updated = crud.update_product(db, product, schemas.ProductUpdate(**updates))

    warning = None
    if stock_received:
        warning = (
            "BUG-UPDATE-001: El campo stock se ignora durante la edicion. "
            "Fallo intencional para la practica."
        )

    return schemas.ProductMutationResponse(product=updated, psp_warning=warning)


@router.delete("/{product_id}", response_model=schemas.APIMessage)
def delete_product(product_id: int, db: Session = Depends(get_db)) -> schemas.APIMessage:
    product = crud.get_product_by_id(db, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado.")
    # PSP BUG: solo lo desactiva, no lo elimina realmente.(Corregido)
    db.add(product)
    db.commit()
    return schemas.APIMessage(  
        message=f"Producto {product_id} eliminado correctamente."
    )

