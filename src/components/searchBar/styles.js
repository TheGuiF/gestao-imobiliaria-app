import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.red[50],
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 8,
    height: 45,
  },
  input: {
    flex: 1,
    color: colors.gray[600],
    marginRight: 10,
  },
});
