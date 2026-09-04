import ListaCategorias from './components/ListaCategorias'
import ListaTransacoes from './components/ListaTransacoes'
import ResumoMensal from './components/ResumoMensal'
import NovaTransacao from './components/NovaTransacao'
import './App.css'

function App() {
  return (
    <div className="app">
      <h1>Controle Financeiro</h1>
      <ListaCategorias />
      <ListaTransacoes />
      <ResumoMensal />
      <NovaTransacao />
    </div>
  )
}

export default App