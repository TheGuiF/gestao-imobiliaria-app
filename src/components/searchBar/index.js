import { View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { colors } from "../../styles/colors";

const SearchBar = ({ search, setSearch, onFilterPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
        <MaterialIcons name="filter-list" size={24} color={colors.red[100]} />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por endereço ou tipo"
          value={search}
          onChangeText={setSearch}
        />
        <MaterialIcons name="search" size={24} color={colors.red[100]} />
      </View>
    </View>
  );
};

export default SearchBar;
