import { View, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { colors } from "../../styles/colors";

const SearchBar = ({ search, setSearch }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="menu" size={24} color={colors.red[200]} />
      <TextInput
        style={styles.input} //Padronização de Pesquisa
        placeholder="Pesquisar por imóveis" //Falta criar funcionalidade
        value={search} //de pesquisa em si
        onChangeText={setSearch}
      />
      <MaterialIcons name="search" size={24} color={colors.red[200]} />
    </View>
  );
};

export default SearchBar;
