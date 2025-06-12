import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.gray[200],
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  logo: {
    height: 70,
    marginTop: 100,
    marginBottom: 40,
  },
  card: {
    width: "100%",
    backgroundColor: colors.gray[100],
    padding: 20,
    elevation: 4,
    borderRadius: 15,
  },
  error: {
    color: colors.red[100],
    marginBottom: 10,
  },
});

export default styles;