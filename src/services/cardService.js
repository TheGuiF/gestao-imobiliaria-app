//Chamadas para o backend (criação de imóvel, imagens, etc)
import api from "./api";

// Cria um novo imóvel no banco de dados
export const criarImovel = async (dados) => {
  try {
    const response = await api.post("/imoveis", dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar imóvel:", error);
    throw error;
  }
};

// Busca todos os imóveis cadastrados
export const buscarImoveis = async () => {
  try {
    const response = await api.get("/imoveis");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error);
    throw error;
  }
};

// (Opcional futuro) Deletar imóvel
export const deletarImovel = async (id) => {
  try {
    await api.delete(`/imoveis/${id}`);
  } catch (error) {
    console.error("Erro ao deletar imóvel:", error);
    throw error;
  }
};

// (Opcional futuro) Atualizar imóvel
export const atualizarImovel = async (id, dadosAtualizados) => {
  try {
    const response = await api.put(`/imoveis/${id}`, dadosAtualizados);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar imóvel:", error);
    throw error;
  }
};

