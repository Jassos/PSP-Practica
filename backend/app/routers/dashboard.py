from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db import get_db

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/summary", response_model=schemas.DashboardSummary)
def get_summary(db: Session = Depends(get_db)) -> schemas.DashboardSummary:
    summary = crud.dashboard_summary(db)

    return schemas.DashboardSummary(
        **summary,
        psp_warning=None
    )


@router.get("/stock-alerts", response_model=schemas.DashboardStockAlertsResponse)
def get_stock_alerts(db: Session = Depends(get_db)) -> schemas.DashboardStockAlertsResponse:
    alerts = crud.dashboard_stock_alerts(db)

    return schemas.DashboardStockAlertsResponse(
        items=[schemas.DashboardStockAlert(**row) for row in alerts],
        psp_warning=None,
    )


@router.get("/recent-products", response_model=schemas.DashboardRecentProductsResponse)
def get_recent_products(db: Session = Depends(get_db)) -> schemas.DashboardRecentProductsResponse:
    products = crud.dashboard_recent_products(db)

    return schemas.DashboardRecentProductsResponse(
        items=[schemas.DashboardRecentProduct(**row) for row in products],
        psp_warning=None,
    )

