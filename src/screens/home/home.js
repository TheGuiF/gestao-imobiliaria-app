import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

import styles from "./styles";
import { colors } from "../../styles/colors";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.quote}>
        Gerencie seus imóveis com mais agilidade e precisão
      </Text>

      <View style={styles.area}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CardCreation1")}
        >
          <MaterialIcons name="home" size={32} color={colors.red[100]} />
          <Text style={styles.buttonText}>Adicionar Imóvel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Catálogo")}
        >
          <Feather name="folder" size={32} color={colors.red[100]} />
          <Text style={styles.buttonText}>Catalogo</Text>
        </TouchableOpacity>

       
      </View>
    </View>
  );
}
