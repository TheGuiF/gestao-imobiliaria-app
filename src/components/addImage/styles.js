import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
  },
  buttomWrapper: {
    flex: 1,
    margin: 5,
    justifyContent: "center",
  },
  pickerButtom: {
    flex: 1,
  },
  imageScroll: {
    marginVertical: 20,
    paddingTop: 10,
  },
  imageContainer: {
    marginRight: 10,
    position: "relative",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  removeButton: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: colors.red[100],
    borderRadius: 15,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  removeButtonText: {
    color: colors.gray[100],
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default styles;
