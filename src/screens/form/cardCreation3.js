import { View, ScrollView, Alert, KeyboardAvoidingView } from "react-native";

import Feather from "@expo/vector-icons/Feather";

import RedButton from "../../components/redButton";
import AddImage from "../../components/addImage";
import styles from "./styles";
import { colors } from "../../styles/colors";

const CardCreationScreen3 = ({ navigation }) => {

  const combinedFunctions = () => {

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
    <KeyboardAvoidingView behavior="padding">
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logo}>
          <Feather name="home" size={70} color={colors.red[100]} />
        </View>
        <View style={styles.card}>

          <AddImage/>

          <RedButton title="Finalizar" onPress={combinedFunctions} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CardCreationScreen3;