import React, { createContext, useContext, useState } from "react";

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
    imagens: [], // Armazena URIs das imagens selecionadas
  });

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
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

  return (
    <CardCreationContext.Provider
      value={{ formData, updateFormData, resetFormData }}
    >
      {children}
    </CardCreationContext.Provider>
  );
};

export const useCardCreation = () => useContext(CardCreationContext);
