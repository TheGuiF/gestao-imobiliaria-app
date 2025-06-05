import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import SearchBar from "../../components/searchBar";
import FilterModal from "../../components/filterModal";
import Cards from "../../components/cards";
import { colors } from "../../styles/colors";
import { useCardCreation } from "../../contexts/cardCreationContext";

const CatalogScreen = ({ navigation }) => {
  const { imoveis, loading: carregando } = useCardCreation();
  const [erro, setErro] = useState(null);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState(null);
  const [imoveisFiltrados, setImoveisFiltrados] = useState([]);

  useEffect(() => {
    if (!search.trim() && !activeFilters) {
      setImoveisFiltrados(imoveis);
      return;
    }

    let filtrados = [...imoveis];

    // Aplicar filtro de busca por texto
    if (search.trim()) {
      const termo = search.toLowerCase();
      filtrados = filtrados.filter((item) => {
        return (
          item.endereco?.toLowerCase().includes(termo) ||
          item.tipoImovel?.toLowerCase().includes(termo)
        );
      });
    }

    // Aplicar filtros avançados
    if (activeFilters) {
      if (activeFilters.priceRange.min !== null) {
        filtrados = filtrados.filter(
          (item) => parseFloat(item.valorVenda.replace(/\D/g, '')) >= activeFilters.priceRange.min
        );
      }
      if (activeFilters.priceRange.max !== null) {
        filtrados = filtrados.filter(
          (item) => parseFloat(item.valorVenda.replace(/\D/g, '')) <= activeFilters.priceRange.max
        );
      }
      if (activeFilters.bedrooms !== null) {
        filtrados = filtrados.filter(
          (item) => parseInt(item.dormitorios) === activeFilters.bedrooms
        );
      }
      if (activeFilters.location) {
        const locationTerm = activeFilters.location.toLowerCase();
        filtrados = filtrados.filter(
          (item) => item.endereco?.toLowerCase().includes(locationTerm)
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

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
  };

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
          <MaterialIcons name="close" size={20} color={colors.red[100]} />
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
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[200],
    padding: 20,
    paddingTop: 50,
  },
  scrollView: {
    marginTop: 10,
  },
  clearFiltersButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.red[50],
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  clearFiltersText: {
    color: colors.red[100],
    marginRight: 5,
    fontSize: 14,
    fontWeight: "500",
  },
  errorText: {
    color: colors.red[100],
    textAlign: "center",
    marginTop: 30,
  },
  noResultsText: {
    color: colors.gray[600],
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
  },
});

export default CatalogScreen;