//botão para deletar um imovel
//mostra um alerta de confirmação antes de deletar e um alerta de sucesso
//depois ou erro
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { useCardCreation } from "../../contexts/cardCreationContext";
import CustomAlert from "../customAlert";
import ConfirmAlert from "../confirmAlert";
import { colors } from "../../styles/colors";

export default function DeleteButton({ imovelId, onSuccess }) {
  const { deletarImovel } = useCardCreation();
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  //mostra o alerta de confirmação
  const handleDelete = () => {
    setShowConfirmAlert(true);
  };

  //deleta o imovel e mostra um alerta de sucesso ou erro
  const handleConfirmDelete = async () => {
    try {
      await deletarImovel(imovelId);
      setAlertTitle("Sucesso");
      setAlertMessage("Imóvel removido.");
      setShowAlert(true);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao deletar:", error);
      setAlertTitle("Erro");
      setAlertMessage("Não foi possível deletar o imóvel.");
      setShowAlert(true);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={handleDelete}>
        <Feather name="trash-2" size={22} color={colors.red[100]} />
      </TouchableOpacity>

      <ConfirmAlert
        visible={showConfirmAlert}
        title="Confirmação"
        message="Deseja deletar este imóvel?"
        onClose={() => setShowConfirmAlert(false)}
        onConfirm={handleConfirmDelete}
      />

      <CustomAlert
        visible={showAlert}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
      />
    </>
  );
}
