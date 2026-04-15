from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class APIMessage(BaseModel):
    message: str
    psp_warning: str | None = None


class UserCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)


class UserPublic(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserDebug(UserPublic):
    password_hash: str
    psp_warning: str | None = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserPublic
    psp_warning: str | None = None


class ProductCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    description: str = Field(default="", max_length=500)
    price: float = Field(gt=0)
    stock: int = Field(ge=0, le=10000)


class ProductUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=120)
    description: str | None = Field(default=None, max_length=500)
    price: float | None = Field(default=None, gt=0)
    stock: int | None = Field(default=None, ge=0, le=10000)
    is_active: bool | None = None


class ProductPublic(BaseModel):
    id: int
    name: str
    description: str
    price: float
    stock: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ProductMutationResponse(BaseModel):
    product: ProductPublic
    psp_warning: str | None = None


class DashboardSummary(BaseModel):
    users_total: int
    products_total: int
    active_products: int
    low_stock_products: int
    psp_warning: str | None = None


class DashboardStockAlert(BaseModel):
    product_id: int
    product_name: str
    stock: int
    status: str


class DashboardRecentProduct(BaseModel):
    product_id: int
    product_name: str
    price: float
    created_at: datetime


class DashboardStockAlertsResponse(BaseModel):
    items: list[DashboardStockAlert]
    psp_warning: str | None = None


class DashboardRecentProductsResponse(BaseModel):
    items: list[DashboardRecentProduct]
    psp_warning: str | None = None

