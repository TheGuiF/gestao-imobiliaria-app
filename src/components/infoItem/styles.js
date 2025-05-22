import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
    icons: {
    backgroundColor: colors.gray[100],
    alignItems: 'center',
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
})

export default styles;
