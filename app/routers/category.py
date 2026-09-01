from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryResponse


router = APIRouter(prefix="/categories", tags=["categories"])

@router.post("/", response_model=CategoryResponse)
def criar_category(item: CategoryCreate, db: Session = Depends(get_db)):
    novo = Category(**item.model_dump())
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo

@router.get("/", response_model=list[CategoryResponse])
def listar_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()

@router.put("/{category_id}", response_model=CategoryResponse)
def atualizar_category(category_id: int, item: CategoryCreate, db: Session = Depends(get_db)):
    categoria = db.query(Category).filter(Category.id == category_id).first()

    if categoria is None:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")

    for campo, valor in item.model_dump().items():
        setattr(categoria, campo, valor)

    db.commit()
    db.refresh(categoria)
    return categoria

@router.delete("/{category_id}")
def deletar_category(category_id: int, db: Session = Depends(get_db)):
    categoria = db.query(Category).filter(Category.id == category_id).first()

    if categoria is None:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")

    db.delete(categoria)
    db.commit()
    return {"mensagem": "Categoria deletada com sucesso"}