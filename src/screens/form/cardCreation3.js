//ultima etapa do formulario de criacao do imovel
import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";

import Feather from "@expo/vector-icons/Feather";

import { useCardCreation } from "../../contexts/cardCreationContext";
import CustomAlert from "../../components/customAlert";
import RedButton from "../../components/redButton";
import AddImages from "../../components/addImage";
import { colors } from "../../styles/colors";
import styles from "./styles";

const CardCreationScreen3 = ({ navigation }) => {
  const { formData, resetFormData, salvarImovel } = useCardCreation();
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // salva o imovel e mostra um alerta de sucesso ou erro
  const finalizarCadastro = async () => {
    try {
      // Formata as imagens como uma lista de URIs
      const payload = {
        ...formData,
        imagens: formData.imagens.map((img) => img.uri),
      };

      await salvarImovel(payload);
      resetFormData();

      setAlertTitle("Sucesso!");
      setAlertMessage("O imóvel foi incluído ao catálogo!");
      setShowAlert(true);
    } catch (error) {
      console.error("Erro ao salvar imóvel:", error);
      setAlertTitle("Erro");
      setAlertMessage("Não foi possível cadastrar o imóvel.");
      setShowAlert(true);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logo}>
          <Feather name="home" size={70} color={colors.red[200]} />
        </View>

        <View style={styles.card}>
          <AddImages />
          <RedButton title="Finalizar" onPress={finalizarCadastro} />
        </View>

        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          message={alertMessage}
          onClose={() => {
            setShowAlert(false);
            if (alertTitle === "Sucesso!") {
              navigation.navigate("Catálogo");
            }
          }}
          icon="check-circle"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CardCreationScreen3;