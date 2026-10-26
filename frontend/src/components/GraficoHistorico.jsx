import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { buscarDados } from '../services/api'


function GraficoHistorico({ atualizador }) {
  const [dados, setDados] = useState([])
  console.log(dados)

  const nomesMeses = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ]

  useEffect(() => {
  async function buscarHistorico() {
    try {
      const dadosRecebidos = await buscarDados(
        '/summary/historico?quantidade_meses=6&mes=10&ano=2026'
      )

      setDados(dadosRecebidos)
    } catch (erro) {
      console.error('Erro ao buscar histórico:', erro)
    }
  }

  buscarHistorico()
}, [atualizador])

  return (
    <div className="grafico-card">
      <h2>Histórico Financeiro</h2>
      <ResponsiveContainer width="100%" height={300}>
  <BarChart data={dados}>
    <XAxis 
    dataKey="mes" 
    tickFormatter={(mes) => nomesMeses[mes - 1]}
    />
    <YAxis />
    <Tooltip />
    <Legend /> 
    <Bar 
    dataKey="total_entradas" 
    name="Total de Entradas"
    fill="#4f9d8f"
    />
    <Bar 
    dataKey="total_saidas" 
    name="Total de Saídas"
    fill="#e63946"
    /> 
  </BarChart>
  
</ResponsiveContainer>
    </div>
  )
}

export default GraficoHistorico