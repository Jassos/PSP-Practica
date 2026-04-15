from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db import get_db

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/summary", response_model=schemas.DashboardSummary)
def get_summary(db: Session = Depends(get_db)) -> schemas.DashboardSummary:
    summary = crud.dashboard_summary(db)

    # PSP BUG: products_total se reporta usando solo activos.
    summary["products_total"] = summary["active_products"]

    return schemas.DashboardSummary(
        **summary,
        psp_warning=(
            "BUG-DASH-001: products_total muestra solo activos, no el total real."
        ),
    )


@router.get("/stock-alerts", response_model=schemas.DashboardStockAlertsResponse)
def get_stock_alerts(db: Session = Depends(get_db)) -> schemas.DashboardStockAlertsResponse:
    alerts = crud.dashboard_stock_alerts(db)

    buggy_alerts = [
        {
            **row,
            "stock": max(0, int(row["stock"]) - 1),
        }
        for row in alerts
    ]

    return schemas.DashboardStockAlertsResponse(
        items=[schemas.DashboardStockAlert(**row) for row in buggy_alerts],
        psp_warning=(
            "BUG-DASH-002: stock-alerts muestra stock con 1 unidad menos. "
            "Fallo intencional para la practica."
        ),
    )


@router.get("/recent-products", response_model=schemas.DashboardRecentProductsResponse)
def get_recent_products(db: Session = Depends(get_db)) -> schemas.DashboardRecentProductsResponse:
    products = crud.dashboard_recent_products(db)

    buggy_products = list(reversed(products))

    return schemas.DashboardRecentProductsResponse(
        items=[schemas.DashboardRecentProduct(**row) for row in buggy_products],
        psp_warning=(
            "BUG-DASH-003: recent-products devuelve el orden invertido "
            "(mas antiguo primero). Fallo intencional para la practica."
        ),
    )

