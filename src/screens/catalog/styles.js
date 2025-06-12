import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.gray[200],
      padding: 20,
      paddingTop: 50,
    },
    scrollView: {
      marginTop: 10,
    },
    clearFiltersButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.red[50],
      padding: 8,
      borderRadius: 8,
      marginTop: 10,
    },
    clearFiltersText: {
      color: colors.red[300],
      marginRight: 5,
      fontSize: 14,
      fontWeight: "500",
    },
    errorText: {
      color: colors.red[100],
      textAlign: "center",
      marginTop: 30,
    },
    noResultsText: {
      color: colors.red[200],
      textAlign: "center",
      fontWeight: "600",
      marginTop: 30,
      fontSize: 16,
    },
  });

  export default styles;