import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray[200],
    flex: 1,
  },
  swiperContent: {
    height: 250,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.gray[600],
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.red[100],
    marginBottom: 20,
  },
  infoContainer: {
    gap: 8,
    marginBottom: 24,
  },
  //---Taxas---
  taxContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  taxTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.gray[900],
    marginBottom: 8,
  },
  taxContentInfo: {
    flexDirection: "row",
    gap: "40%",
  },
  taxInfo: {
    fontWeight: "600",
  },
  //---Documentos---
  documentsContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  documentsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray[800],
    marginBottom: 8,
  },
  documentItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[300],
  },
  documentItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  documentName: {
    fontSize: 16,
    color: colors.gray[600],
    flex: 1,
  },
  noDocuments: {
    fontSize: 16,
    color: colors.gray[500],
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 16,
  },
  addButton: {
    backgroundColor: colors.red[100],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 48,
    width: "100%",
    marginBottom: 12,
  },
  addButtonText: {
    color: colors.gray[100],
    fontSize: 18,
    fontWeight: "600",
  },
});

export default styles;