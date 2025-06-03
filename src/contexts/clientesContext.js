import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  salvarCliente,
  buscarTodosClientes,
  buscarClientePorId,
  atualizarCliente,
  deletarCliente,
  initClientesDatabase,
} from '../services/clientesDatabase';

const ClientesContext = createContext({});

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const inicializarClientes = useCallback(async () => {
    try {
      await initClientesDatabase();
      const todosClientes = await buscarTodosClientes();
      setClientes(todosClientes);
    } catch (error) {
      console.error('Erro ao inicializar clientes:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const adicionarCliente = async (clienteData) => {
    try {
      const novoCliente = await salvarCliente(clienteData);
      setClientes(prev => [...prev, novoCliente]);
      return novoCliente;
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
      throw error;
    }
  };

  const atualizarClienteExistente = async (id, clienteData) => {
    try {
      const clienteAtualizado = await atualizarCliente(id, clienteData);
      setClientes(prev =>
        prev.map(cliente =>
          cliente.id === id ? clienteAtualizado : cliente
        )
      );
      return clienteAtualizado;
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw error;
    }
  };

  const removerCliente = async (id) => {
    try {
      await deletarCliente(id);
      setClientes(prev => prev.filter(cliente => cliente.id !== id));
    } catch (error) {
      console.error('Erro ao remover cliente:', error);
      throw error;
    }
  };

  const buscarCliente = async (id) => {
    try {
      return await buscarClientePorId(id);
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      throw error;
    }
  };

  return (
    <ClientesContext.Provider
      value={{
        clientes,
        loading,
        inicializarClientes,
        adicionarCliente,
        atualizarClienteExistente,
        removerCliente,
        buscarCliente,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};

export const useClientes = () => {
  const context = useContext(ClientesContext);
  if (!context) {
    throw new Error('useClientes deve ser usado dentro de um ClientesProvider');
  }
  return context;
}; 