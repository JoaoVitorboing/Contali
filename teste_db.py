from app.db.session import SessionLocal
from app.models.user import User
from app.models.category import Category
from app.models.transaction import Transaction

db = SessionLocal()

# Cria um usuário de teste
novo_user = User(nome="Você")
db.add(novo_user)
db.commit()
db.refresh(novo_user)

print(f"Usuário criado com id: {novo_user.id}")

# Cria uma categoria vinculada a esse usuário
nova_categoria = Category(nome="Comida", user_id=novo_user.id)
db.add(nova_categoria)
db.commit()
db.refresh(nova_categoria)

print(f"Categoria criada com id: {nova_categoria.id}, pertence ao user_id: {nova_categoria.user_id}")

db.close()