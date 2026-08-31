from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)

    # Isso permite acessar user.categories e user.transactions no código Python,
    # mesmo sem criar essas colunas de fato na tabela "users"
    categories = relationship("Category", back_populates="owner")
    transactions = relationship("Transaction", back_populates="owner")