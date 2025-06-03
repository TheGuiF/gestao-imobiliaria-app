import AsyncStorage from '@react-native-async-storage/async-storage';

const CLIENTES_KEY = '@imobiliaria:clientes';
let nextId = 1;

export const initClientesDatabase = async () => {
  try {
    const storedId = await AsyncStorage.getItem('@imobiliaria:nextClienteId');
    if (storedId) {
      nextId = parseInt(storedId);
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const salvarCliente = async (cliente) => {
  try {
    const clientes = await buscarTodosClientes();
    const novoCliente = { ...cliente, id: nextId++ };
    clientes.push(novoCliente);
    await AsyncStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes));
    await AsyncStorage.setItem('@imobiliaria:nextClienteId', nextId.toString());
    return novoCliente;
  } catch (error) {
    throw error;
  }
};

export const buscarTodosClientes = async () => {
  try {
    const clientesString = await AsyncStorage.getItem(CLIENTES_KEY);
    return clientesString ? JSON.parse(clientesString) : [];
  } catch (error) {
    throw error;
  }
};

export const buscarClientePorId = async (id) => {
  try {
    const clientes = await buscarTodosClientes();
    return clientes.find(cliente => cliente.id === id) || null;
  } catch (error) {
    throw error;
  }
};

export const atualizarCliente = async (id, clienteAtualizado) => {
  try {
    const clientes = await buscarTodosClientes();
    const index = clientes.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
      clientes[index] = { ...clienteAtualizado, id };
      await AsyncStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes));
      return clientes[index];
    }
    throw new Error('Cliente não encontrado');
  } catch (error) {
    throw error;
  }
};

export const deletarCliente = async (id) => {
  try {
    const clientes = await buscarTodosClientes();
    const clientesFiltrados = clientes.filter(cliente => cliente.id !== id);
    await AsyncStorage.setItem(CLIENTES_KEY, JSON.stringify(clientesFiltrados));
    return true;
  } catch (error) {
    throw error;
  }
}; 