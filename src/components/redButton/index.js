import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

const RedButton = ({ title, onPress }) => {
  return (
    //Botão padronizado
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default RedButton;