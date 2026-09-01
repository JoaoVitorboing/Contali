from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models  # garante que todos os models são carregados
from app.routers import user, category, transaction, summary

app = FastAPI(title="Controle Financeiro API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(category.router)
app.include_router(transaction.router)
app.include_router(summary.router)