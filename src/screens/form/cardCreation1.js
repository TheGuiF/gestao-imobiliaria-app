import { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Alert } from "react-native";

import Feather from "@expo/vector-icons/Feather";
import InputField from "../../components/input";
import RedButton from "../../components/redButton";
import styles from "./styles";
import { colors } from "../../styles/colors";
import { useCardCreation } from "../../contexts/cardCreationContext";

const CardCreationScreen1 = ({ navigation }) => {
  const { formData, updateFormData } = useCardCreation();
  const [submitted, setSubmitted] = useState(false);

  const handleContinuar = () => {
    setSubmitted(true);

    const { endereco, area, dormitorios, garagens } = formData;

    if (!endereco || !area || !dormitorios || !garagens) {
      Alert.alert(
        "Campos obrigatórios",
        "Por favor, preencha todos os campos."
      );
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
            label="Tamanho da área construída:"
            value={formData.area}
            onChangeText={(text) =>
              updateFormData({ area: text.replace(/[^0-9]/g, "") })
            }
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CardCreationScreen1;
