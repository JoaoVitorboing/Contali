import  { useState, useEffect } from 'react';

function buscarNomeCategoria(categoryId, categorias) {
    const categoria = categorias.find((categoria) => categoria.id === categoryId);
    return categoria ? categoria.nome : 'Categoria não encontrada';
}

function ListaTransacoes() {
  const [transacoes, setTransacoes] = useState([]);
  const [categorias, setCategorias] = useState([])

useEffect(() => {
    fetch('http://127.0.0.1:8000/transactions/')
      .then((resposta) => resposta.json())
      .then((dados) => setTransacoes(dados))

    fetch('http://127.0.0.1:8000/categories/')
      .then((resposta) => resposta.json())
      .then((dados) => setCategorias(dados))
  }, []);

  return (
    <div className="card">
      <h2>Minhas transações</h2>
      <ul>
        {transacoes.map((transacao) => (
          <li key={transacao.id}>
            {transacao.descricao} - {buscarNomeCategoria(transacao.category_id, categorias)} - R$ {transacao.valor.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListaTransacoes