import { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";

import Feather from "@expo/vector-icons/Feather";

import InputField from "../../components/input";
import RedButton from "../../components/redButton";
import CustomAlert from "../../components/customAlert";
import styles from "./styles";
import { colors } from "../../styles/colors";
import { useCardCreation } from "../../contexts/cardCreationContext";

const CardCreationScreen2 = ({ navigation }) => {
  const { formData, updateFormData } = useCardCreation();
  const [submitted, setSubmitted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleContinuar = () => {
    setSubmitted(true);

    const { valorVenda, situacao, iptu, tipoImovel } = formData;

    if (!valorVenda || !situacao || !iptu || !tipoImovel) {
      setShowAlert(true);
      return;
    }

    navigation.navigate("CardCreation3");
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
          <InputField
            label="Valor da Venda:"
            value={formData.valorVenda}
            onChangeText={(text) =>
              updateFormData({ valorVenda: text.replace(/[^0-9]/g, "") })
            }
            keyboardType="numeric"
            hasError={submitted && !formData.valorVenda}
          />
          <InputField
            label="Situação:"
            value={formData.situacao}
            onChangeText={(text) => updateFormData({ situacao: text })}
            hasError={submitted && !formData.situacao}
          />
          <InputField
            label="Taxa de IPTU anual:"
            value={formData.iptu}
            onChangeText={(text) =>
              updateFormData({ iptu: text.replace(/[^0-9]/g, "") })
            }
            keyboardType="numeric"
            hasError={submitted && !formData.iptu}
          />
          <InputField
            label="Tipo de Imóvel:"
            value={formData.tipoImovel}
            onChangeText={(text) => updateFormData({ tipoImovel: text })}
            hasError={submitted && !formData.tipoImovel}
          />

          <RedButton title="Continuar" onPress={handleContinuar} />
        </View>

        <CustomAlert
          visible={showAlert}
          title="Campos Obrigatórios"
          message="Por favor, preencha todos os campos."
          onClose={() => setShowAlert(false)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CardCreationScreen2;
