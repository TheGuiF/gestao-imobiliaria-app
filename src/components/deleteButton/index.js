import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { deletarImovel } from "../../services/cardService"; 
export default function DeleteButton({ imovelId, onSuccess }) {
  const handleDelete = () => {
    Alert.alert("Confirmação", "Deseja deletar este imóvel?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Deletar",
        style: "destructive",
        onPress: async () => {
          try {
            await deletarImovel(imovelId);
            Alert.alert("Sucesso", "Imóvel removido.");
            if (onSuccess) onSuccess(); // callback opcional
          } catch (error) {
            console.error("Erro ao deletar:", error);
            Alert.alert("Erro", "Não foi possível deletar o imóvel.");
          }
        },
      },
    ]);
  };

  return (
    <TouchableOpacity onPress={handleDelete}>
      <Feather name="trash-2" size={22} color="red" />
    </TouchableOpacity>
  );
}
