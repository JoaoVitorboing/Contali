import { useState } from 'react';

function NovaTransacao() {
    const [descricao, setDescricao] = useState('');
    const [tipo, setTipo] = useState('entrada');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [categoryId, setCategoryId] = useState('')
    const [userId, setUserId] = useState('')


function handleSubmit(evento) {
    evento.preventDefault();

const novaTransacao = {
    descricao: descricao,
    tipo: tipo,
    valor: parseFloat(valor),
    data: data,
    category_id: parseInt(categoryId),
    user_id: parseInt(userId)
}

fetch('http://127.0.0.1:8000/transactions/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novaTransacao)
})
.then((resposta) => resposta.json())
.then((dados) => {
    alert('Transação cadastrada com sucesso!');
    window.location.reload();
})
}

return (
    <div className="card">
        <h2>Nova Transação</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
            />

            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
            </select>

            <input
                type="number"
                placeholder="Valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
            />

            <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
            />

            <input
                type="number"
                placeholder="ID da Categoria"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            />

            <input 
                type="number"
                placeholder="ID do Usuário"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />

            <button type="submit">Criar Transação</button>
            </form>
    </div>
)
}   

export default NovaTransacao