import { View, TextInput, Text } from "react-native";
import styles from "./style";

const InputField = ({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  hasError = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText} // Criação do componente
        placeholder=" . . ." // padronizado de Input
        style={[styles.input, hasError && styles.inputError]}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
        inputMode={keyboardType === "numeric" ? "numeric" : undefined}
      />
    </View>
  );
};

export default InputField;
