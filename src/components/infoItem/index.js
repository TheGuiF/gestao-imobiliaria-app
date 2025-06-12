//é praquela parte de informações do imovel
import { View, Text } from "react-native";
import styles from "./styles";

const InfoItem = ({ icon, label, value }) => (
  <View style={styles.icons}>
    <View style={styles.iconBox}>{icon}</View>
    <Text style={styles.iconText}>{label}</Text>
    <Text style={styles.iconResult}>{value}</Text>
  </View>
);

export default InfoItem;
