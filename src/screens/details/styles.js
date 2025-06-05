import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  swiperContent: {
    height: 250,
    backgroundColor: colors.gray[100],
  },
  content: {
    padding: 16,
    backgroundColor: colors.gray[100],
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.gray[600],
    marginBottom: 4,
  },
  price: {
    fontSize: 28,
    fontWeight: "600",
    color: colors.red[100],
    marginBottom: 20,
  },
  infoContainer: {
    gap: 8,
    marginBottom: 24,
  },
  taxContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  taxTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.gray[600],
    margin: 8,
  },
  taxContentInfo:{
    flexDirection: "row",
    gap: "40%",
  },
  taxInfo:{
    fontWeight: "600",
  }
});

export default styles;
