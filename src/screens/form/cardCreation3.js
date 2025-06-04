import React from "react";
import { View, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import RedButton from "../../components/redButton";
import AddImages from "../../components/addImage";
import styles from "./styles";
import { colors } from "../../styles/colors";

import { useCardCreation } from "../../contexts/cardCreationContext";

const CardCreationScreen3 = ({ navigation }) => {
  const { formData, resetFormData, salvarImovel } = useCardCreation();

  const finalizarCadastro = async () => {
    try {
      // Formata as imagens como uma lista de URIs
      const payload = {
        ...formData,
        imagens: formData.imagens.map((img) => img.uri),
      };

      await salvarImovel(payload);

      Alert.alert("Sucesso", "O imóvel foi incluído ao catálogo com sucesso!");
      resetFormData();
      navigation.navigate("Catálogo");
    } catch (error) {
      console.error("Erro ao salvar imóvel:", error);
      Alert.alert("Erro", "Não foi possível cadastrar o imóvel.");
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logo}>
          <Feather name="home" size={70} color={colors.red[100]} />
        </View>

        <View style={styles.card}>
          <AddImages />
          <RedButton title="Finalizar" onPress={finalizarCadastro} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CardCreationScreen3;
