import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray[100],
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 2,
  },
  filterButton: {
    padding: 8,
    paddingRight: 0,
  },
  input: {
    flex: 1,
    marginLeft: 15,
    color: colors.gray[600],
    fontSize: 16,
    marginRight: 10,
  },
  searchIcon: {
    position: "absolute",
    right: 16,
  },
});