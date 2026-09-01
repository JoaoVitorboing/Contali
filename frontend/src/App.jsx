import { useState, useEffect } from 'react'

function App() {
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/categories/')
      .then((resposta) => resposta.json())
      .then((dados) => setCategorias(dados))
  }, [])

  return (
    <div>
      <h1>Controle Financeiro</h1>
      <h2>Minhas categorias</h2>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>{categoria.nome}</li>
        ))}
      </ul>
    </div>
  )
}

export default App