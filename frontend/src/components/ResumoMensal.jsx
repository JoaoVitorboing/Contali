import { useState, useEffect} from 'react';

function ResumoMensal({ atualizador }) {
  const [resumo, setResumo] = useState(null)

    useEffect(() => {
    fetch('http://127.0.0.1:8000/summary/?mes=9&ano=2026')
      .then((resposta) => resposta.json())
      .then((dados) => setResumo(dados))
  }, [atualizador]);

  if (!resumo) {
    return <p>Carregando resumo mensal...</p>
  }

return (
    <div className="card resumo">
      <h2>Resumo Mensal</h2>
      <div className="resumo-grid">
        <div className="resumo-item">
          <span className="resumo-label">Receitas</span>
          <span className="resumo-valor">R$ {resumo.total_entradas.toFixed(2)}</span>
        </div>
        <div className="resumo-item">
          <span className="resumo-label">Despesas</span>
          <span className="resumo-valor">R$ {resumo.total_saidas.toFixed(2)}</span>
        </div>
        <div className="resumo-item">
          <span className="resumo-label">Saldo</span>
          <span className="resumo-valor">R$ {resumo.saldo.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

export default ResumoMensal