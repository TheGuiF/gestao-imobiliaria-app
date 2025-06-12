import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray[600],
    marginBottom: 8,
  },
  labelError: {
    color: colors.red[200],
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: colors.gray[100],
  },
  selectButtonError: {
    borderColor: colors.red[200],
  },
  selectButtonText: {
    fontSize: 16,
    color: colors.gray[600],
  },
  dropdown: {
    position: "absolute",
    top: 65,
    left: 0,
    right: 0,
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    elevation: 4,
    zIndex: 100,
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[300],
  },
  optionText: {
    fontSize: 16,
    color: colors.gray[600],
  },
});

export default styles;
