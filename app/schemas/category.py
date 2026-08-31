from pydantic import BaseModel

class CategoryCreate(BaseModel):
    nome: str
    user_id: int
    # campos que quem cria precisa enviar

class CategoryResponse(BaseModel):
    id: int
    nome: str
    user_id: int
    # os mesmos campos do model

    class Config:
        from_attributes = True