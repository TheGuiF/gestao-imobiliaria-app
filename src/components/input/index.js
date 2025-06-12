//input padronizado
import { View, TextInput, Text } from "react-native";
import { colors } from "../../styles/colors";
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
        onChangeText={onChangeText}
        placeholder=" . . ."
        style={[styles.input, hasError && styles.inputError]}
        placeholderTextColor={colors.gray[600]}
        keyboardType={keyboardType} //serve pra falar se é só numero ou letra
        inputMode={keyboardType === "numeric" ? "numeric" : undefined}
      />
    </View>
  );
};

export default InputField;