//modal de filtro da barra de pesquisa
import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import SelectField from "../selectField";
import { colors } from "../../styles/colors";
import styles from "./styles";

const FilterModal = ({ visible, onClose, onApplyFilters }) => {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [bedrooms, setBedrooms] = useState("");
  const [tipoImovel, setTipoImovel] = useState("");
  const [situacao, setSituacao] = useState("");
  const [parkingSpaces, setParkingSpaces] = useState("");

  const handleApplyFilters = () => {
    const filters = {
      priceRange: {
        min: priceRange.min
          ? parseFloat(priceRange.min.replace(/\D/g, ""))
          : null,
        max: priceRange.max
          ? parseFloat(priceRange.max.replace(/\D/g, ""))
          : null,
      },
      bedrooms: bedrooms ? parseInt(bedrooms) : null,
      tipoImovel: tipoImovel || null,
      situacao: situacao || null,
      parkingSpaces: parkingSpaces ? parseInt(parkingSpaces) : null,
    };

    onApplyFilters(filters);
    onClose();
  };

  const formatCurrency = (value) => {
    if (!value) return "";
    return value
      .toString()
      .replace(/\D/g, "")
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  const handlePriceChange = (field, value) => {
    setPriceRange((prev) => ({
      ...prev,
      [field]: formatCurrency(value),
    }));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtros</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={colors.gray[600]} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Faixa de Preço</Text>
              <View style={styles.priceInputContainer}>
                <View style={styles.priceInput}>
                  <Text style={styles.currencySymbol}>R$</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Mínimo"
                    keyboardType="numeric"
                    value={priceRange.min}
                    onChangeText={(value) => handlePriceChange("min", value)}
                  />
                </View>
                <Text style={styles.separator}>até</Text>
                <View style={styles.priceInput}>
                  <Text style={styles.currencySymbol}>R$</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Máximo"
                    keyboardType="numeric"
                    value={priceRange.max}
                    onChangeText={(value) => handlePriceChange("max", value)}
                  />
                </View>
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Dormitórios</Text>
              <TextInput
                style={[styles.input, styles.fullWidthInput]}
                placeholder="Número de dormitórios"
                keyboardType="numeric"
                value={bedrooms}
                onChangeText={setBedrooms}
              />
            </View>

            <View style={styles.filterSection}>
              <SelectField
                label="Tipo de Imóvel"
                value={tipoImovel}
                options={["Apartamento", "Casa", "Comercial", "Sítio", "Lote", "Armazém"]}
                onChange={setTipoImovel}
              />
            </View>

            <View style={styles.filterSection}>
              <SelectField
                label="Situação"
                value={situacao}
                options={["Disponível", "Indisponível"]}
                onChange={setSituacao}
              />
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Vagas de Garagem</Text>
              <TextInput
                style={[styles.input, styles.fullWidthInput]}
                placeholder="Número de vagas"
                keyboardType="numeric"
                value={parkingSpaces}
                onChangeText={setParkingSpaces}
              />
            </View>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyFilters}
            >
              <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;