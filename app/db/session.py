from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# URL de conexão: "sqlite:///./financeiro.db" significa
# "crie/use um arquivo chamado financeiro.db na pasta raiz do projeto"
SQLALCHEMY_DATABASE_URL = "sqlite:///./financeiro.db"

# O engine é o que realmente sabe "falar" com o banco de dados.
# connect_args é uma exigência específica do SQLite (não existe em Postgres, por exemplo)
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# SessionLocal é uma "fábrica" de sessões — cada vez que você chamar SessionLocal(),
# ganha uma nova conversa com o banco para fazer consultas ou salvar dados
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    """
    Abre uma sessão, entrega ela para quem pediu (a API, mais pra frente),
    e garante que ela seja fechada no final, mesmo se der erro no meio.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()