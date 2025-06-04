// styles.js (arquivo de estilo)
import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontWeight: "600",
    color: colors.red[100],
    textAlign: "center",
    position: 'absolute',
    top: '15%',
    zIndex: 1,
    paddingHorizontal: 20,
  },
  logo: {
    width: 420,
    height: 420,
    marginTop: -40,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    gap: 16,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.red[100],
  },
});

export default styles;
