from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.transaction import Transaction
from app.schemas.transaction import TransactionCreate, TransactionResponse
from fastapi import HTTPException

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

@router.put("/{transaction_id}", response_model=TransactionResponse)
def atualizar_transaction(transaction_id: int, item: TransactionCreate, db: Session = Depends(get_db)):
    transacao = db.query(Transaction).filter(Transaction.id == transaction_id).first()

    if transacao is None:
        raise HTTPException(status_code=404, detail="Transação não encontrada")

    for campo, valor in item.model_dump().items():
        setattr(transacao, campo, valor)

    db.commit()
    db.refresh(transacao)
    return transacao


@router.delete("/{transaction_id}")
def deletar_transaction(transaction_id: int, db: Session = Depends(get_db)):
    transacao = db.query(Transaction).filter(Transaction.id == transaction_id).first()

    if transacao is None:
        raise HTTPException(status_code=404, detail="Transação não encontrada")

    db.delete(transacao)
    db.commit()
    return {"mensagem": "Transação deletada com sucesso"}
