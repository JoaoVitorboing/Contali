from fastapi import APIRouter, Depends
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