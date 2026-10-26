import { useState } from 'react'
import ListaCategorias from './components/ListaCategorias'
import ListaTransacoes from './components/ListaTransacoes'
import ResumoMensal from './components/ResumoMensal'
import NovaTransacao from './components/NovaTransacao'
import './App.css'
import { Home, Wallet, PieChart, Settings } from 'lucide-react';
import GraficoHistorico from './components/GraficoHistorico'

function App() {
  const [atualizador, setAtualizador] = useState(0)

  function notificarMudanca() {
    setAtualizador(atualizador + 1)
  }

return (
    <div className="app-layout">
      <div className="sidebar">
        <Home />
        <Wallet />
        <PieChart />
        <Settings />
      </div>
      <div className="app">
        <h1>Controle Financeiro</h1>
        <ResumoMensal atualizador={atualizador} />
        <div className="conteudo-principal">
          <div className="coluna-esquerda">
            <NovaTransacao onTransacaoCriada={notificarMudanca} />
          </div>
          <div className="coluna-direita">
            <ListaTransacoes onTransacaoAlterada={notificarMudanca} atualizador={atualizador} />
            <ListaCategorias />
            <GraficoHistorico atualizador={atualizador} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App