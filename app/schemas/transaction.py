from pydantic import BaseModel
from typing import Optional
from datetime import date


class TransactionCreate(BaseModel):
    descricao: Optional[str] = None
    tipo: str
    valor: float
    data: date
    category_id: int
    user_id: int


class TransactionResponse(BaseModel):
    id: int
    descricao: Optional[str] = None
    tipo: str
    valor: float
    data: date
    category_id: int
    user_id: int

    class Config:
        from_attributes = True