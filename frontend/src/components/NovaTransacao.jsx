import { useState, useEffect } from "react";
import { buscarDados, enviarDados } from "../services/api";

function NovaTransacao({ onTransacaoCriada }) {
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [userId, setUserId] = useState("");

  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);

  useEffect(() => {
    const buscarCategorias = async () => {
      try {
        const resposta = await fetch("http://127.0.0.1:8000/categories/");
        const dados = await resposta.json();
        setListaCategorias(dados);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    const buscarUsuarios = async () => {
      try {
        const resposta = await fetch("http://127.0.0.1:8000/users/");
        const dados = await resposta.json();
        setListaUsuarios(dados);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    buscarCategorias();
    buscarUsuarios();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const novaTransacao = {
      descricao: descricao,
      tipo: tipo,
      valor: parseFloat(valor.replace(".", "").replace(",", ".")),
      data: data,
      category_id: parseInt(categoryId),
      user_id: parseInt(userId),
    };

    try {
      await enviarDados("/transactions/", novaTransacao);

      alert("Transação cadastrada com sucesso!");
      onTransacaoCriada();
    } catch (erro) {
      console.error("Erro ao criar transação:", erro);
    }
  }

  function formatarValor(digitosBrutos) {
    const apenasNumeros = digitosBrutos.replace(/\D/g, "");
    const numeroEmCentavos = parseInt(apenasNumeros || "0", 10);
    const valorDecimal = numeroEmCentavos / 100;
    return valorDecimal.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
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

        <div className="input-com-prefixo">
          <span className="prefixo-moeda">R$</span>
          <input
            type="text"
            id="Valor"
            value={valor}
            onChange={(e) => setValor(formatarValor(e.target.value))}
          />
        </div>

        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Selecione a categoria</option>
          {listaCategorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>

        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="">Selecione o usuário</option>
          {listaUsuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nome}
            </option>
          ))}
        </select>

        <button type="submit">Criar Transação</button>
      </form>
    </div>
  );
}

export default NovaTransacao;
