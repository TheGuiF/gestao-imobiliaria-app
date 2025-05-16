import { useState } from "react";
import { View, ScrollView, Alert } from "react-native";

import Feather from "@expo/vector-icons/Feather";

import InputField from "../../components/input";
import RedButton from "../../components/redButton";
import styles from "./styles";
import { colors } from "../../styles/colors";

const CardCreationScreen2 = ({ navigation }) => {
  const [valorVenda, setValorVenda] = useState("");
  const [situacao, setSituacao] = useState("");
  const [iptu, setIptu] = useState("");
  const [tipoImovel, setTipoImovel] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const combinedFunctions = () => {
    setSubmitted(true);

    if (!valorVenda || !situacao || !iptu || !tipoImovel) {
      alert("Por favor, preencha todos os campos."); //Verifica se todos os campos foram preenchidos
      return;
    }

    navigation.navigate("Home"); //Volta para a página inicial

    Alert.alert(
      "Adicionado",
      "O imóvel foi incluido ao catálogo com sucesso!",
      [
        { text: "OK" }, //Atribui uma notificação de Conclusão
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logo}>
        <Feather name="home" size={70} color={colors.red[100]} />
      </View>
      <View style={styles.card}>
        <InputField
          label="Valor da Venda:"
          value={valorVenda}
          onChangeText={(text) => setValorVenda(text.replace(/[^0-9]/g, ""))}
          keyboardType="numeric"
          hasError={submitted && !valorVenda}
        />
        <InputField
          label="Situação:"
          value={situacao}
          onChangeText={setSituacao}
          hasError={submitted && !situacao}
        />
        <InputField
          label="Taxa de IPTU anual:"
          value={iptu}
          onChangeText={(text) => setIptu(text.replace(/[^0-9]/g, ""))}
          keyboardType="numeric"
          hasError={submitted && !iptu}
        />
        <InputField
          label="Tipo de Imóvel:"
          value={tipoImovel}
          onChangeText={setTipoImovel}
          hasError={submitted && !tipoImovel}
        />

        <RedButton title="Finalizar" onPress={combinedFunctions} />
      </View>
    </ScrollView>
  );
};

export default CardCreationScreen2;
