import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterButton: {
    marginRight: 12,
    padding: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.red[50],
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 25,
    height: 50,
  },
  input: {
    flex: 1,
    color: colors.gray[600],
    marginRight: 10,
    fontSize: 16,
  },
});
