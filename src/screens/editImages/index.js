//tela de edicao das imagens do imovel
import React from "react";
import { View, ScrollView, Alert } from "react-native";

import { useCardCreation } from "../../contexts/cardCreationContext";
import AddImages from "../../components/addImage";
import RedButton from "../../components/redButton";
import styles from "./styles";

const EditImagesScreen = ({ route, navigation }) => {
  const imovel = route.params?.imovel;
  const { atualizarImovel, formData } = useCardCreation();

  //se o imovel nao existe ele volta para a tela anterior
  if (!imovel) {
    navigation.goBack();
    return null;
  }

  // salva as imagens atualizadas do imóvel e mostra um alerta de sucesso ou erro
  const handleSave = async () => {
    try {
      await atualizarImovel(imovel.id, {
        ...imovel,
        imagens: formData.imagens || [],
      });
      Alert.alert("Sucesso", "Imagens atualizadas com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao atualizar imagens:", error);
      Alert.alert("Erro", "Não foi possível atualizar as imagens.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <AddImages initialImages={imovel.imagens || []} />
        <RedButton
          title="Salvar Alterações"
          onPress={handleSave}
          style={{ marginTop: 20 }}
        />
      </View>
    </ScrollView>
  );
};

export default EditImagesScreen;