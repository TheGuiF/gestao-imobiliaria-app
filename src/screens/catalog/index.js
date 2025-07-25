//tela de catalogo, tem todos os cards que dao pro details
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useCardCreation } from "../../contexts/cardCreationContext";
import Cards from "../../components/cards";
import SearchBar from "../../components/searchBar";
import FilterModal from "../../components/filterModal";
import { colors } from "../../styles/colors";
import styles from "./styles";

const CatalogScreen = ({ navigation }) => {
  const { imoveis, loading: carregando } = useCardCreation();
  const [erro, setErro] = useState(null);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState(null);
  const [imoveisFiltrados, setImoveisFiltrados] = useState([]);

  // atualiza a lista de imoveis filtrados sempre que a busca ou os filtros mudam
  useEffect(() => {
    if (!search.trim() && !activeFilters) {
      setImoveisFiltrados(imoveis);
      return;
    }

    let filtrados = [...imoveis];

    // aplica filtro de busca por texto
    if (search.trim()) {
      const termo = search.toLowerCase();
      filtrados = filtrados.filter((item) => {
        return (
          item.endereco?.toLowerCase().includes(termo) ||
          item.tipoImovel?.toLowerCase().includes(termo)
        );
      });
    }

    // aplica filtros avançados
    if (activeFilters) {
      if (activeFilters.priceRange.min !== null) {
        filtrados = filtrados.filter(
          (item) =>
            parseFloat(item.valorVenda.replace(/\D/g, "")) >=
            activeFilters.priceRange.min
        );
      }
      if (activeFilters.priceRange.max !== null) {
        filtrados = filtrados.filter(
          (item) =>
            parseFloat(item.valorVenda.replace(/\D/g, "")) <=
            activeFilters.priceRange.max
        );
      }
      if (activeFilters.bedrooms !== null) {
        filtrados = filtrados.filter(
          (item) => parseInt(item.dormitorios) === activeFilters.bedrooms
        );
      }
      if (activeFilters.tipoImovel) {
        filtrados = filtrados.filter(
          (item) => item.tipoImovel === activeFilters.tipoImovel
        );
      }
      if (activeFilters.situacao) {
        filtrados = filtrados.filter(
          (item) => item.situacao === activeFilters.situacao
        );
      }
      if (activeFilters.parkingSpaces !== null) {
        filtrados = filtrados.filter(
          (item) => parseInt(item.garagens) === activeFilters.parkingSpaces
        );
      }
    }

    setImoveisFiltrados(filtrados);
  }, [search, imoveis, activeFilters]);

  // aplica os filtros escolhidos pelo usuário
  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
  };

  // limpa os filtros selecionados
  const handleClearFilters = () => {
    setActiveFilters(null);
    setSearch("");
  };

  return (
    <View style={styles.container}>
      <SearchBar
        search={search}
        setSearch={setSearch}
        onFilterPress={() => setShowFilters(true)}
      />

      {activeFilters && (
        <TouchableOpacity
          style={styles.clearFiltersButton}
          onPress={handleClearFilters}
        >
          <Text style={styles.clearFiltersText}>Limpar Filtros</Text>
          <MaterialIcons name="close" size={20} color={colors.red[300]} />
        </TouchableOpacity>
      )}

      {carregando ? (
        <ActivityIndicator
          size="large"
          color={colors.red[100]}
          style={{ marginTop: 30 }}
        />
      ) : erro ? (
        <Text style={styles.errorText}>{erro}</Text>
      ) : imoveisFiltrados.length === 0 ? (
        <Text style={styles.noResultsText}>
          Nenhum imóvel encontrado com os filtros selecionados.
        </Text>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {imoveisFiltrados.map((item) => (
            <Cards
              key={item.id}
              img={item.imagens?.[0] || require("../../assets/default.png")}
              cost={`R$${item.valorVenda}`}
              status={item.situacao}
              onClick={() => navigation.navigate("Detail", { imovel: item })}
            >
              {item.endereco}
            </Cards>
          ))}
        </ScrollView>
      )}

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={handleApplyFilters}
      />
    </View>
  );
};

export default CatalogScreen;