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
 import { buscarImoveis } from "../../services/cardService"; 

const CatalogScreen = ({ navigation }) => {
  const [imoveis, setImoveis] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [search, setSearch] = useState("");
  const [imoveisFiltrados, setImoveisFiltrados] = useState([]);

  useEffect(() => {
    const carregarImoveis = async () => {
      try {
        const data = await buscarImoveis(); // ← usa o backend real
        setImoveis(data);
      } catch (err) {
        setErro("Erro ao carregar imóveis");
        console.error(err);
      } finally {
        setCarregando(false);
      }
    };

    const unsubscribe = navigation.addListener("focus", carregarImoveis);
    return unsubscribe;
  }, [navigation]);

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
              img={{
                uri: item.imagens?.[0] || "https://via.placeholder.com/300",
              }}
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

export default CatalogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.gray[200],
    paddingHorizontal: 10,
  },
});