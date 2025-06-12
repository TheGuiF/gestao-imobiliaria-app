// funções para manipular o banco de dados local usando AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

const IMOVEIS_KEY = "@imobiliaria:imoveis";
let nextId = 1;

//inicializa o banco de dados
export const initDatabase = async () => {
  try {
    const storedId = await AsyncStorage.getItem("@imobiliaria:nextId");
    if (storedId) {
      nextId = parseInt(storedId);
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

//salva o imovel no bd
export const salvarImovel = async (imovel) => {
  try {
    const imoveis = await buscarTodosImoveis();
    const novoImovel = { ...imovel, id: nextId++ };
    imoveis.push(novoImovel);
    await AsyncStorage.setItem(IMOVEIS_KEY, JSON.stringify(imoveis));
    await AsyncStorage.setItem("@imobiliaria:nextId", nextId.toString());
    return novoImovel;
  } catch (error) {
    throw error;
  }
};

//busca todos os imoveis no bd
export const buscarTodosImoveis = async () => {
  try {
    const imoveisString = await AsyncStorage.getItem(IMOVEIS_KEY);
    return imoveisString ? JSON.parse(imoveisString) : [];
  } catch (error) {
    throw error;
  }
};

//busca um imovel por id
export const buscarImovelPorId = async (id) => {
  try {
    const imoveis = await buscarTodosImoveis();
    return imoveis.find((imovel) => imovel.id === id) || null;
  } catch (error) {
    throw error;
  }
};

//atualiza um imovel
export const atualizarImovel = async (id, imovelAtualizado) => {
  try {
    const imoveis = await buscarTodosImoveis();
    const index = imoveis.findIndex((imovel) => imovel.id === id);
    if (index !== -1) {
      imoveis[index] = { ...imovelAtualizado, id };
      await AsyncStorage.setItem(IMOVEIS_KEY, JSON.stringify(imoveis));
      return imoveis[index];
    }
    throw new Error("Imóvel não encontrado");
  } catch (error) {
    throw error;
  }
};

//deleta um imovel do bd
export const deletarImovel = async (id) => {
  try {
    const imoveis = await buscarTodosImoveis();
    const imoveisFiltrados = imoveis.filter((imovel) => imovel.id !== id);
    await AsyncStorage.setItem(IMOVEIS_KEY, JSON.stringify(imoveisFiltrados));
    return true;
  } catch (error) {
    throw error;
  }
};