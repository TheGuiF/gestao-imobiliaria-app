import { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";

import Feather from "@expo/vector-icons/Feather";
import InputField from "../../components/input";
import RedButton from "../../components/redButton";
import CustomAlert from "../../components/customAlert";
import styles from "./styles";
import { colors } from "../../styles/colors";
import { useCardCreation } from "../../contexts/cardCreationContext";

const CardCreationScreen1 = ({ navigation }) => {
  const { formData, updateFormData } = useCardCreation();
  const [submitted, setSubmitted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleContinuar = () => {
    setSubmitted(true);

    const { endereco, area, dormitorios, garagens } = formData;

    if (!endereco || !area || !dormitorios || !garagens) {
      setShowAlert(true);
      return;
    }

    navigation.navigate("CardCreation2");
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logo}>
          <Feather name="home" size={70} color={colors.red[100]} />
        </View>

        <View style={styles.card}>
          <InputField
            label="Endereço do Imóvel:"
            value={formData.endereco}
            onChangeText={(text) => updateFormData({ endereco: text })}
            hasError={submitted && !formData.endereco}
          />

          <InputField
            label="Tamanho da área construída (m²):"
            value={formData.area}
            onChangeText={(text) => updateFormData({ area: text.replace(/[^0-9]/g, "") })}
            keyboardType="numeric"
            hasError={submitted && !formData.area}
          />

          <InputField
            label="Quantidade de Dormitórios:"
            value={formData.dormitorios}
            onChangeText={(text) =>
              updateFormData({ dormitorios: text.replace(/[^0-9]/g, "") })
            }
            keyboardType="numeric"
            hasError={submitted && !formData.dormitorios}
          />

          <InputField
            label="Quantidade de Garagens:"
            value={formData.garagens}
            onChangeText={(text) =>
              updateFormData({ garagens: text.replace(/[^0-9]/g, "") })
            }
            keyboardType="numeric"
            hasError={submitted && !formData.garagens}
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

export default CardCreationScreen1;
