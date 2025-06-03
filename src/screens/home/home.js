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

      <View>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => navigation.navigate("Form")}
        >
          <MaterialIcons name="home" size={32} color={colors.red[100]} />
          <Text style={styles.buttonText}>Adicionar Imóvel</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.area}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Catálogo")}
        >
          <Feather name="folder" size={32} color={colors.red[100]} />
          <Text style={styles.buttonText}>Catalogo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Clientes")}
        >
          <Feather name="user" size={30} color={colors.red[100]} />
          <Text style={styles.buttonText}>Clientes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
