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

    updated = crud.update_product(db, product, schemas.ProductUpdate(**updates))

    return schemas.ProductMutationResponse(product=updated, psp_warning=None)


@router.delete("/{product_id}", response_model=schemas.APIMessage)
def delete_product(product_id: int, db: Session = Depends(get_db)) -> schemas.APIMessage:
    product = crud.get_product_by_id(db, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado.")

    # PSP BUG: solo lo desactiva, no lo elimina realmente.
    product.is_active = False
    db.add(product)
    db.commit()

    return schemas.APIMessage(
        message=f"Producto {product_id} eliminado (simulado).",
        psp_warning=(
            "BUG-DELETE-001: El endpoint realiza borrado logico pero responde como si fuera fisico."
        ),
    )
