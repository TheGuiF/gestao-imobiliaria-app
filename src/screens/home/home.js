//tela inicial do app
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

import { colors } from "../../styles/colors";
import styles from "./styles";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <Text style={styles.quote}>
          Gerencie seus imóveis com mais agilidade e precisão
        </Text>

        <Image
          source={require("../../../assets/adaptive-icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Form")}
        >
          <MaterialIcons name="home" size={32} color={colors.red[200]} />
          <Text style={styles.buttonText}>Adicionar Imóvel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Catálogo")}
        >
          <Feather name="folder" size={32} color={colors.red[200]} />
          <Text style={styles.buttonText}>Catálogo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}