import React, { createContext, useContext, useState, useEffect } from "react";
import * as database from '../../services/database';
import * as storage from '../../services/storage';

const CardCreationContext = createContext();

export const CardCreationProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    endereco: "",
    area: "",
    dormitorios: "",
    garagens: "",
    valorVenda: "",
    situacao: "",
    iptu: "",
    tipoImovel: "",
    imagens: [],
  });

  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      await database.initDatabase();
      const imoveisDB = await database.buscarTodosImoveis();
      setImoveis(imoveisDB);
      await storage.salvarImoveisStorage(imoveisDB);
    } catch (error) {
      console.error('Erro ao inicializar app:', error);
      const imoveisStorage = await storage.buscarImoveisStorage();
      if (imoveisStorage) {
        setImoveis(imoveisStorage);
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para formatar valores monetários (R$)
  const formatCurrency = (value) => {
    if (!value) return '';
    const numericValue = value.toString().replace(/\D/g, '');
    if (numericValue.length <= 2) return numericValue;
    
    const integerPart = numericValue.slice(0, -2);
    const decimalPart = numericValue.slice(-2);
    
    const formattedInteger = integerPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return `${formattedInteger},${decimalPart}`;
  };

  // Função para formatar área (m²)
  const formatArea = (value) => {
    if (!value) return '';
    const numericValue = value.toString().replace(/\D/g, '');
    if (numericValue.length <= 2) return numericValue;
    
    const integerPart = numericValue.slice(0, -2);
    const decimalPart = numericValue.slice(-2);
    
    return `${integerPart},${decimalPart}`;
  };

  const updateFormData = (newData) => {
    setFormData((prev) => {
      const updatedData = { ...prev };
      
      // Aplica formatação específica para cada campo
      if (newData.valorVenda !== undefined) {
        updatedData.valorVenda = formatCurrency(newData.valorVenda);
      }
      if (newData.iptu !== undefined) {
        updatedData.iptu = formatCurrency(newData.iptu);
      }
      if (newData.area !== undefined) {
        updatedData.area = formatArea(newData.area);
      }
      
      // Atualiza outros campos normalmente
      Object.keys(newData).forEach(key => {
        if (key !== 'valorVenda' && key !== 'iptu' && key !== 'area') {
          updatedData[key] = newData[key];
        }
      });

      // Trata o array de imagens separadamente
      if (newData.imagens !== undefined) {
        updatedData.imagens = Array.isArray(newData.imagens) ? newData.imagens : [];
      }
      
      return updatedData;
    });
  };

  const resetFormData = () => {
    setFormData({
      endereco: "",
      area: "",
      dormitorios: "",
      garagens: "",
      valorVenda: "",
      situacao: "",
      iptu: "",
      tipoImovel: "",
      imagens: [],
    });
  };

  const salvarImovel = async () => {
    try {
      const payload = {
        ...formData,
        imagens: Array.isArray(formData.imagens) ? formData.imagens : [],
        valorVenda: formatCurrency(formData.valorVenda),
      };

      const novoImovel = await database.salvarImovel(payload);
      const imoveisAtualizados = await database.buscarTodosImoveis();
      setImoveis(imoveisAtualizados);
      await storage.salvarImoveisStorage(imoveisAtualizados);
      resetFormData();
      return novoImovel;
    } catch (error) {
      console.error('Erro ao salvar imóvel:', error);
      throw error;
    }
  };

  const buscarImovel = async (id) => {
    try {
      return await database.buscarImovelPorId(id);
    } catch (error) {
      console.error('Erro ao buscar imóvel:', error);
      throw error;
    }
  };

  const atualizarImovel = async (id, dadosAtualizados) => {
    try {
      const payload = {
        ...dadosAtualizados,
        imagens: Array.isArray(dadosAtualizados.imagens) ? dadosAtualizados.imagens : [],
        valorVenda: formatCurrency(dadosAtualizados.valorVenda),
      };

      const imovelAtualizado = await database.atualizarImovel(id, payload);
      const imoveisAtualizados = await database.buscarTodosImoveis();
      setImoveis(imoveisAtualizados);
      await storage.salvarImoveisStorage(imoveisAtualizados);

      // Atualiza o formData se o imóvel sendo editado for o atual
      if (formData.id === id) {
        updateFormData(imovelAtualizado);
      }

      return imovelAtualizado;
    } catch (error) {
      console.error('Erro ao atualizar imóvel:', error);
      throw error;
    }
  };

  const deletarImovel = async (id) => {
    try {
      await database.deletarImovel(id);
      const imoveisAtualizados = await database.buscarTodosImoveis();
      setImoveis(imoveisAtualizados);
      await storage.salvarImoveisStorage(imoveisAtualizados);
    } catch (error) {
      console.error('Erro ao deletar imóvel:', error);
      throw error;
    }
  };

  return (
    <CardCreationContext.Provider
      value={{
        formData,
        updateFormData,
        resetFormData,
        imoveis,
        loading,
        salvarImovel,
        buscarImovel,
        atualizarImovel,
        deletarImovel,
        formatCurrency,
        formatArea
      }}
    >
      {children}
    </CardCreationContext.Provider>
  );
};

export const useCardCreation = () => {
  const context = useContext(CardCreationContext);
  if (!context) {
    throw new Error('useCardCreation deve ser usado dentro de um CardCreationProvider');
  }
  return context;
};
