import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[200],
  },
  swiperContent: {
    flexDirection: "row",
    height: 250,
    width: "100%",
  },
  title: {
    fontSize: 28,
    color: "red",
    fontWeight: "600",
  },
  subTitle: {
    fontSize: 24,
  },
  icons: {
    backgroundColor: colors.gray[100],
    borderRadius: 25,
    elevation: 2,
    padding: 10,
    width: "100%",
    flexDirection: "row",
    gap: 10,
  },
  iconText: {
    fontSize: 16,
    fontWeight: 600,
  },
  iconResult: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.red[100],
  },
});

export default styles;
