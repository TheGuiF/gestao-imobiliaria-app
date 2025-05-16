import { useState } from "react";
import { View, ScrollView } from "react-native";

import Feather from "@expo/vector-icons/Feather";

import InputField from "../../components/input";
import RedButton from "../../components/redButton";
import styles from "./styles";
import { colors } from "../../styles/colors";

const CardCreationScreen1 = ({ navigation }) => {
  const [endereco, setEndereco] = useState("");
  const [area, setArea] = useState("");
  const [dormitorios, setDormitorios] = useState("");
  const [garagens, setGaragens] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleContinuar = () => {
    setSubmitted(true);

    if (!endereco || !area || !dormitorios || !garagens) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    navigation.navigate("CardCreation2");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logo}>
        <Feather name="home" size={70} color={colors.red[100]} />
      </View>

      <View style={styles.card}>
        <InputField
          label="Endereço do Imóvel:"
          value={endereco}
          onChangeText={setEndereco}
          hasError={submitted && !endereco}
        />
        <InputField
          label="Tamanho da área construída:"
          value={area}
          onChangeText={(text) => setArea(text.replace(/[^0-9]/g, ""))}
          keyboardType="numeric"
          hasError={submitted && !area}
        />
        <InputField
          label="Quantidade de Dormitórios:"
          value={dormitorios}
          onChangeText={(text) => setDormitorios(text.replace(/[^0-9]/g, ""))}
          keyboardType="numeric"
          hasError={submitted && !dormitorios}
        />
        <InputField
          label="Quantidade de Garagens:"
          value={garagens}
          onChangeText={(text) => setGaragens(text.replace(/[^0-9]/g, ""))}
          keyboardType="numeric"
          hasError={submitted && !garagens}
        />

        <RedButton title="Continuar" onPress={handleContinuar} />
      </View>
    </ScrollView>
  );
};

export default CardCreationScreen1;
