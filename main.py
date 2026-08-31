from fastapi import FastAPI

from app import models  # garante que todos os models são carregados
from app.routers import user, category, transaction

app = FastAPI(title="Controle Financeiro API")

app.include_router(user.router)
app.include_router(category.router)
app.include_router(transaction.router)