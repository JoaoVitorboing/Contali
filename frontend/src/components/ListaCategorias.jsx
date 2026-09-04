import { useState, useEffect } from 'react'

function ListaCategorias() {
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/categories/')
      .then((resposta) => resposta.json())
      .then((dados) => setCategorias(dados))
  }, [])

  return (
    <div className="card">
      <h2>Minhas categorias</h2>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>{categoria.nome}</li>
        ))}
      </ul>
    </div>
  )
}

export default ListaCategorias