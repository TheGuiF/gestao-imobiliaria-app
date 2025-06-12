import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    paddingVertical: "2%",
    marginVertical: "1%",
    alignItems: "center",
    backgroundColor: colors.gray[100],
    flexDirection: "row",
    borderRadius: 12,
    elevation: 2,
  },
  cardImg: {
    width: 100,
    height: 100,
    marginHorizontal: "2%",
    borderRadius: 12,
  },
  cardText: {
    fontSize: 16,
    color: colors.red[200],
    fontWeight: "600",
    verticalAlign: "top",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default styles;