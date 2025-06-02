import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

import styles from "./styles";
import { colors } from "../../styles/colors";
import icon from "../../assets/icon.png";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Image source={icon} style={styles.img} />
        <Text style={styles.quote}>
          Gerencie seus imóveis com mais agilidade e precisão
        </Text>
      </View>

      <View style={styles.area}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CardCreation1")}
        >
          <Feather name="plus" size={30} color={colors.red[200]} />
          <Text style={styles.buttonText}>Adicionar Imóvel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Catalog")}
        >
          <Feather name="folder" size={32} color={colors.red[200]} />
          <Text style={styles.buttonText}>Catalogo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
