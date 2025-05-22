import { ScrollView, View, StyleSheet } from "react-native";
import SearchBar from "../../components/searchBar";
import Cards from "../../components/cards";
import { colors } from "../../styles/colors";

const CatalogScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SearchBar></SearchBar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Cards                                     //Criar um modo de acessar
            img={require("../../assets/image1.png")} //as fotos adicionadas
            cost="R$650.000,00"
            onClick={() => navigation.navigate("Details")}
          >
            Casa em Centro, Guapimirim/RJ
          </Cards>
          <Cards
            img={require("../../assets/image2.jpg")}
            cost="R$950.000,00"
            onClick={() => navigation.navigate("")}
          >
            Apartamento em Braga, Cabo Frio/RJ
          </Cards>
        </View>

        <View>
          <Cards
            img={require("../../assets/default.png")}
            cost="R$000,00"
            onClick={() => navigation.navigate("")}
          >
            Teste
          </Cards>
          <Cards
            img={require("../../assets/default.png")}
            cost="R$000,00"
            onClick={() => navigation.navigate("")}
          >
            Teste
          </Cards>
        </View>

        <View>
          <Cards
            img={require("../../assets/default.png")}
            cost="R$000,00"
            onClick={() => navigation.navigate("")}
          >
            Teste
          </Cards>
          <Cards
            img={require("../../assets/default.png")}
            cost="R$000,00"
            onClick={() => navigation.navigate("")}
          >
            Teste
          </Cards>
        </View>
      </ScrollView>
    </View>
  );
};

export default CatalogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.gray[200],
  },
});
