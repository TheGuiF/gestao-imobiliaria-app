import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  icons: {
    backgroundColor: colors.gray[100],
    alignItems: "center",
    borderRadius: 24,
    padding: 12,
    width: "100%",
    flexDirection: "row",
    gap: 12,
    elevation: 2,
  },
  iconText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.gray[900],
  },
  iconResult: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.red[200],
  },
});

export default styles;