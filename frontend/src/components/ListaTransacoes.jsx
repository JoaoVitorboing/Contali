import { useState, useEffect } from "react";

function buscarNomeCategoria(categoryId, categorias) {
  const categoria = categorias.find((categoria) => categoria.id === categoryId);
  return categoria ? categoria.nome : "Categoria não encontrada";
}

function ListaTransacoes({ onTransacaoAlterada, atualizador }) {
  const [transacoes, setTransacoes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [transacaoEditando, setTransacaoEditando] = useState(null);
  const [descricaoEditada, setDescricaoEditada] = useState("");
  const [valorEditado, setValorEditado] = useState("");
  const [categoriaEditada, setCategoriaEditada] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/transactions/")
      .then((resposta) => resposta.json())
      .then((dados) => setTransacoes(dados));

    fetch("http://127.0.0.1:8000/categories/")
      .then((resposta) => resposta.json())
      .then((dados) => setCategorias(dados));
  }, [atualizador]);

  function apagarTransacao(id) {
    fetch(`http://127.0.0.1:8000/transactions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTransacoes(transacoes.filter((transacao) => transacao.id !== id));
      onTransacaoAlterada()
    });
  }

  function iniciarEdicao(transacao) {
    setTransacaoEditando(transacao.id);
    setDescricaoEditada(transacao.descricao);
    setValorEditado(transacao.valor);
    setCategoriaEditada(transacao.categoria_id);
  }

function salvarEdicao(transacao) {
    const transacaoAtualizada = {
      ...transacao,
      descricao: descricaoEditada,
      valor: parseFloat(valorEditado),
      categoria_id: categoriaEditada,
    };

    fetch(`http://127.0.0.1:8000/transactions/${transacao.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transacaoAtualizada),
    })
      .then((resposta) => resposta.json())
      .then((dadosAtualizados) => {
        setTransacoes(
          transacoes.map((t) => (t.id === transacao.id ? dadosAtualizados : t)),
        );
        setTransacaoEditando(null);
        onTransacaoAlterada();
      });
  }

  console.log(transacoes);

  return (
    <div className="card">
      <h2>Minhas transações</h2>
      
      {/* Adicionamos a classe transaction-list na tag ul */}
      <ul className="transaction-list">
        {transacoes.map((transacao) => (
          <li key={transacao.id} className="transaction-item">
            
            {/* Verifica se a transação atual está em modo de edição */}
            {transacaoEditando === transacao.id ? (
              // --- MODO EDIÇÃO ---
              <div style={{ display: 'flex', gap: '0.5rem', width: '100%', alignItems: 'center' }}>
                <input
                  type="text"
                  value={descricaoEditada}
                  onChange={(e) => setDescricaoEditada(e.target.value)}
                  style={{ flex: 1 }} /* Ocupa o espaço restante */
                />
                <select
                  value={categoriaEditada}
                  onChange={(e) => setCategoriaEditada(e.target.value)}
                  style={{ width: '100px' }}
                >
                  <option value="">Selecione...</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={valorEditado}
                  onChange={(e) => setValorEditado(e.target.value)}
                  style={{ width: '100px' }}
                />
                <div className="transaction-actions">
                  <button onClick={() => salvarEdicao(transacao)} className="btn-primary btn-small">
                    Salvar
                  </button>
                  <button onClick={() => setTransacaoEditando(null)} className="btn-danger btn-small">
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              // --- MODO VISUALIZAÇÃO ---
              <>
                <div className="transaction-info">
                  <span className="transaction-title">{transacao.descricao}</span>
                  <span className="transaction-category">
                    {/* AQUI VOCÊ AJUSTA conforme a propriedade da sua categoria */}
                    Categoria: {buscarNomeCategoria(transacao.category_id, categorias)} 
                  </span>
                </div>
                
                <span className="transaction-value">
                  R$ {parseFloat(transacao.valor).toFixed(2)}
                </span>
                
                <div className="transaction-actions">
                  <button onClick={() => iniciarEdicao(transacao)} className="btn-primary btn-small">
                    Editar
                  </button>
                  <button onClick={() => apagarTransacao(transacao.id)} className="btn-danger btn-small">
                    Apagar
                  </button>
                </div>
              </>
            )}
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaTransacoes;
