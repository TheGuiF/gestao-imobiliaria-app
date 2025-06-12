import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  wrapper: {
    height: 250,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray[200],
  },
  image: {
    width: "100%",
    height: 250,
  },
  dot: {
    backgroundColor: colors.gray[600],
    borderColor: colors.gray[600],
    borderWidth: 2,
    width: 2,
    height: 2,
    borderRadius: 10,
  },
  activeDot: {
    borderColor: colors.gray[600],
    borderWidth: 1,
    width: 12,
    height: 12,
    borderRadius: 10,
  },
});

export default styles;