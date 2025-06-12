// funções para salvar e buscar dados no AsyncStorage do app
import AsyncStorage from '@react-native-async-storage/async-storage';

const IMOVEIS_KEY = '@imobiliaria:imoveis';
const LAST_ID_KEY = '@imobiliaria:lastId';

export const salvarImoveisStorage = async (imoveis) => {
  try {
    await AsyncStorage.setItem(IMOVEIS_KEY, JSON.stringify(imoveis));
  } catch (error) {
    console.error('Erro ao salvar imóveis no AsyncStorage:', error);
    throw error;
  }
};

export const buscarImoveisStorage = async () => {
  try {
    const imoveisString = await AsyncStorage.getItem(IMOVEIS_KEY);
    return imoveisString ? JSON.parse(imoveisString) : [];
  } catch (error) {
    console.error('Erro ao buscar imóveis do AsyncStorage:', error);
    throw error;
  }
};

export const salvarUltimoId = async (id) => {
  try {
    await AsyncStorage.setItem(LAST_ID_KEY, id.toString());
  } catch (error) {
    console.error('Erro ao salvar último ID no AsyncStorage:', error);
    throw error;
  }
};

export const buscarUltimoId = async () => {
  try {
    const id = await AsyncStorage.getItem(LAST_ID_KEY);
    return id ? parseInt(id) : 0;
  } catch (error) {
    console.error('Erro ao buscar último ID do AsyncStorage:', error);
    throw error;
  }
};

export const limparStorage = async () => {
  try {
    await AsyncStorage.multiRemove([IMOVEIS_KEY, LAST_ID_KEY]);
  } catch (error) {
    console.error('Erro ao limpar AsyncStorage:', error);
    throw error;
  }
}; 