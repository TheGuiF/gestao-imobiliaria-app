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
  topContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  quote: {
    fontSize: 24,
    fontWeight: 800,
    color: colors.red[300],
    textAlign: "center",
    position: "absolute",
  },
  img: {
    width: 350,
    height: 350,
    alignSelf: "center",
    marginBottom: 250,
  },
  button: {
    elevation: 3,
    width: 310,
    height: 120,
    borderRadius: 8,
    marginBottom: 18,
    outlineWidth: 0.3,
    alignItems: "center",
    justifyContent: "center",
    outlineColor: colors.red[300],
    backgroundColor: colors.gray[100],
  },
  buttonText: {
    fontSize: 25,
    color: colors.red[200],
    fontWeight: 600,
  },
  area: {
    marginTop: 200,
    bottom: "6%",
    position: "absolute",
  },
});

export default styles;
