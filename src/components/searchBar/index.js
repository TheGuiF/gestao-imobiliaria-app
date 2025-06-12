//barra de pesquisa pro catalogo
import { View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import styles from "./styles";

const SearchBar = ({ search, setSearch, onFilterPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
        <MaterialIcons name="menu" size={24} color={colors.red[200]} />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar por imóvel"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <MaterialIcons name="search" size={24} color={colors.red[200]} />
    </View>
  );
};

export default SearchBar;