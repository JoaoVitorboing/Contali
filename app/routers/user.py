from fastapi import APIRouter, Depends, HTTPException
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

@router.put("/{user_id}", response_model=UserResponse)
def atualizar_usuario(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    usuario = db.query(User).filter(User.id == user_id).first()

    if usuario is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    usuario.nome = user.nome
    db.commit()
    db.refresh(usuario)
    return usuario

@router.delete("/{user_id}")
def deletar_usuario(user_id: int, db: Session = Depends(get_db)):
    usuario = db.query(User).filter(User.id == user_id).first()

    if usuario is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    db.delete(usuario)
    db.commit()
    return {"mensagem": "Usuário deletado com sucesso"}