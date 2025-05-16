import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.red[200],
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    color: colors.gray[100],
    fontWeight: "600",
    fontSize: 18,
  },
});

export default styles;