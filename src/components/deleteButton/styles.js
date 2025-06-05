import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay[100],
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: colors.gray[100],
    borderRadius: 12,
    padding: 20,
    width: "85%",
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: colors.red[100],
  },
  message: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.gray[300],
    borderRadius: 6,
  },
  confirmButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.red[100],
    borderRadius: 6,
  },
  cancelText: {
    color: colors.gray[800],
    fontWeight: "600",
  },
  confirmText: {
    color: "white",
    fontWeight: "600",
  },
});

export default styles;