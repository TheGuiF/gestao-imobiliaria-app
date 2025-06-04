import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";

import SearchBar from "../../components/searchBar";
import Cards from "../../components/cards";
import { colors } from "../../styles/colors";
import { useCardCreation } from "../../contexts/cardCreationContext";

const CatalogScreen = ({ navigation }) => {
  const { imoveis, loading: carregando } = useCardCreation();
  const [erro, setErro] = useState(null);
  const [search, setSearch] = useState("");
  const [imoveisFiltrados, setImoveisFiltrados] = useState([]);

  useEffect(() => {
    if (!search.trim()) {
      setImoveisFiltrados(imoveis);
      return;
    }

    const termo = search.toLowerCase();

    const filtrados = imoveis.filter((item) => {
      return (
        item.endereco?.toLowerCase().includes(termo) ||
        item.tipoImovel?.toLowerCase().includes(termo)
      );
    });

    setImoveisFiltrados(filtrados);
  }, [search, imoveis]);

  return (
    <View style={styles.container}>
      <SearchBar search={search} setSearch={setSearch} />

      {carregando ? (
        <ActivityIndicator
          size="large"
          color={colors.red[100]}
          style={{ marginTop: 30 }}
        />
      ) : erro ? (
        <Text
          style={{ color: colors.red[100], textAlign: "center", marginTop: 30 }}
        >
          {erro}
        </Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {imoveisFiltrados.map((item) => (
            <Cards
              key={item.id}
              img={item.imagens?.[0] || require("../../assets/default.png")}
              cost={`R$${item.valorVenda}`}
              status={item.situacao}
              onClick={() => navigation.navigate("Details", { imovel: item })}
            >
              {item.endereco}
            </Cards>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[200],
    padding: 20,
  },
});

export default CatalogScreen;