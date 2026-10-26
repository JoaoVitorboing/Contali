import { useState, useEffect} from 'react';
import { buscarDados } from '../services/api'

function ResumoMensal({ atualizador }) {
  const [resumo, setResumo] = useState(null)

    useEffect(() => {
  async function buscarResumo() {
    try {
      const dados = await buscarDados(
        '/summary/?mes=9&ano=2026'
      )

      setResumo(dados)
    } catch (erro) {
      console.error('Erro ao buscar resumo:', erro)
    }
  }

  buscarResumo()
}, [atualizador])

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