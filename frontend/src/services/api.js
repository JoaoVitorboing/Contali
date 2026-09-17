// src/services/api.js

// URL base do seu FastAPI
const API_URL = 'http://127.0.0.1:8000';

// Função genérica para facilitar requisições GET
export async function buscarDados(endpoint) {
  try {
    const resposta = await fetch(`${API_URL}${endpoint}`);
    if (!resposta.ok) {
      throw new Error(`Erro na requisição: ${resposta.status}`);
    }
    return await resposta.json();
  } catch (erro) {
    console.error(`Erro ao buscar ${endpoint}:`, erro);
    throw erro;
  }
}

// Função genérica para requisições POST
export async function enviarDados(endpoint, dados) {
  try {
    const resposta = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // ??? Como convertemos o objeto 'dados' de JS para String JSON?
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      throw new Error(`Erro ao enviar dados: ${resposta.status}`);
    }

    return await resposta.json();
  } catch (erro) {
    console.error(`Erro ao enviar para ${endpoint}:`, erro);
    throw erro;
  }
}