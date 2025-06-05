import { View, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { colors } from "../../styles/colors";

const SearchBar = ({ search, setSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por endereço ou tipo"
        value={search}
        onChangeText={setSearch}
      />
      <MaterialIcons name="search" size={24} color={colors.red[200]} />
    </View>
  );
};

export default SearchBar;
