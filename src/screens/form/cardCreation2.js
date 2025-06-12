//segunda etapa do formulario de criacao do imovel
import { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";

import Feather from "@expo/vector-icons/Feather";

import { useCardCreation } from "../../contexts/cardCreationContext";
import CustomAlert from "../../components/customAlert";
import RedButton from "../../components/redButton";
import InputField from "../../components/input";
import SelectField from "../../components/selectField";
import { colors } from "../../styles/colors";
import styles from "./styles";

const CardCreationScreen2 = ({ navigation }) => {
  const { formData, updateFormData } = useCardCreation();
  const [submitted, setSubmitted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // valida se todos os campos obrigatórios foram preenchidos antes de ir pra proxima etapa
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
          <Feather name="home" size={70} color={colors.red[200]} />
        </View>
        <View style={styles.card}>
          <SelectField
            label="Tipo de Imóvel:"
            value={formData.tipoImovel}
            options={[
              "Apartamento",
              "Casa",
              "Comercial",
              "Sítio",
              "Lote",
              "Armazém",
            ]}
            onChange={(value) => updateFormData({ tipoImovel: value })}
            hasError={submitted && !formData.tipoImovel}
          />
          <SelectField
            label="Situação:"
            value={formData.situacao}
            options={["Disponível", "Indisponível"]}
            onChange={(value) => updateFormData({ situacao: value })}
            hasError={submitted && !formData.situacao}
          />
          <InputField
            label="Valor da Venda (R$):"
            value={formData.valorVenda}
            onChangeText={(text) =>
              updateFormData({ valorVenda: text.replace(/[^0-9]/g, "") })
            }
            keyboardType="numeric"
            hasError={submitted && !formData.valorVenda}
          />
          <InputField
            label="Taxa de IPTU anual (R$):"
            value={formData.iptu}
            onChangeText={(text) =>
              updateFormData({ iptu: text.replace(/[^0-9]/g, "") })
            }
            keyboardType="numeric"
            hasError={submitted && !formData.iptu}
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
