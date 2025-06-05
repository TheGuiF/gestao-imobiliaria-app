import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
    icons: {
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    borderRadius: 18,
    padding: 12,
    width: "100%",
    flexDirection: "row",
    gap: 12,
    elevation: 1,
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
  },
})

export default styles;
