import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray[100],
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    margin: "4%",
    marginTop: "12%",
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
});

export default styles;
