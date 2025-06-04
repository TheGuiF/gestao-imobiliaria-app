import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
    icons: {
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
    width: "100%",
    flexDirection: "row",
    gap: 12,
  },
  iconText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[600],
  },
  iconResult: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.red[100],
    marginLeft: 'auto',
  },
})

export default styles;
