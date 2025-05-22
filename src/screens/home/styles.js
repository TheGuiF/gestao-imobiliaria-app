// styles.js (arquivo de estilo)
import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray[200],
  },
  quote: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 32,
    color: colors.red[300],
    width: "85%",
    textAlign: "center",
    position: "absolute",
    top: "10%",
  },
  button: {
    elevation: 3,
    width: 310,
    height: 120,
    borderRadius: 8,
    marginBottom: 18,
    outlineWidth: 0.3,
    outlineColor: colors.red[100],
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray[100],
  },
  buttonText: {
    fontSize: 25,
    color: colors.red[100],
    fontWeight: 600,
  },
  area: {
    gap: 15,
    marginTop: 200,
    bottom: "6%",
   
    position: "absolute",
  },
});

export default styles;
