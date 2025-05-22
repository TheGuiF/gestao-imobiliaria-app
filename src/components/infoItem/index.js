import { View, Text } from "react-native";
import styles from "./styles";

const InfoItem = ({ icon, label, value }) => (
  <View style={styles.icons}>
    {icon}
    <Text style={styles.iconText}>{label}</Text>
    <Text style={styles.iconResult}>{value}</Text>
  </View>
);

export default InfoItem;
