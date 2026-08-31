from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse

router = APIRouter(prefix="/users", tags=["users"])
@router.post("/", response_model=UserResponse)
def criar_usuario(user: UserCreate, db: Session = Depends(get_db)):
    novo_user = User(nome=user.nome)
    db.add(novo_user)
    db.commit()
    db.refresh(novo_user)
    return novo_user


@router.get("/", response_model=list[UserResponse])
def listar_usuarios(db: Session = Depends(get_db)):
    return db.query(User).all()