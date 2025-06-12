import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[200],
  },
  topContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  quote: {
    fontSize: 25,
    fontWeight: "800",
    color: colors.red[300],
    textAlign: "center",
    position: "absolute",
    top: "15%",
    paddingHorizontal: 20,
  },
  logo: {
    width: 480,
    height: 480,
    marginTop: -150,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    gap: 16,
  },
  button: {
    backgroundColor: colors.gray[100],
    borderColor: colors.gray[500],
    borderWidth: 1,
    borderRadius: 8,
    elevation: 2,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.red[200],
  },
});

export default styles;