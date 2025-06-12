// seletor padronizado
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import styles from "./styles";

const SelectField = ({ label, value, options, onChange, hasError }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  //estado para controlar a visibilidade do dropdown
  return (
    <View style={styles.container}>
      <Text style={[styles.label, hasError && styles.labelError]}>{label}</Text>
      <TouchableOpacity
        style={[styles.selectButton, hasError && styles.selectButtonError]}
        onPress={() => setDropdownVisible(!dropdownVisible)}
        activeOpacity={0.8}
      >
        <Text style={styles.selectButtonText}>
          {value || "Selecione uma opção"}
        </Text>
        <MaterialIcons
          name="arrow-drop-down"
          size={24}
          color={colors.gray[600]}
        />
      </TouchableOpacity>
      {dropdownVisible && (
        <View style={styles.dropdown}>
          {options.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.option}
              onPress={() => {
                onChange(item);
                setDropdownVisible(false);
              }}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default SelectField;