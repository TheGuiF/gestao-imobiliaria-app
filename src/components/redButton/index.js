//botão vermelho padronizado
import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import { Platform } from "react-native";
const RedButton = ({ title, onPress }) => {
  console.log("Versão Android:", Platform.OS, Platform.Version);
  return (
    
    //Botão padronizado
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
      
    </TouchableOpacity>
    
  );
};

export default RedButton;