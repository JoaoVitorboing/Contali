from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.transaction import Transaction
from app.schemas.transaction import TransactionCreate, TransactionResponse

router = APIRouter(prefix="/transactions", tags=["transactions"])

@router.post("/", response_model=TransactionResponse)
def criar_transaction(item: TransactionCreate, db: Session = Depends(get_db)):
    novo = Transaction(**item.model_dump())
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo

@router.get("/", response_model=list[TransactionResponse])
def listar_transactions(db: Session = Depends(get_db)):
    return db.query(Transaction).all()
