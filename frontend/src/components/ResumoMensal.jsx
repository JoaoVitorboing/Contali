import { useState, useEffect} from 'react';

function ResumoMensal() {
  const [resumo, setResumo] = useState(null);

    useEffect(() => {
    fetch('http://127.0.0.1:8000/summary/?mes=9&ano=2026')
      .then((resposta) => resposta.json())
      .then((dados) => setResumo(dados))
  }, []);

  if (!resumo) {
    return <p>Carregando resumo mensal...</p>
  }

  return (
    <div className="card resumo">
      <h2>Resumo Mensal</h2>
      <p>Receitas: R$ {resumo.total_entradas.toFixed(2)}</p>
      <p>Despesas: R$ {resumo.total_saidas.toFixed(2)}</p>
      <p>Saldo: R$ {resumo.saldo.toFixed(2)}</p>
    </div>
  )
}

export default ResumoMensal