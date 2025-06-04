import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[200],
  },
  swiperContent: {
    height: 250,
    backgroundColor: colors.gray[100],
  },
  content: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.gray[600],
    marginBottom: 4,
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.red[100],
    marginBottom: 20,
  },
  infoContainer: {
    gap: 8,
    marginBottom: 24,
  },
  taxContainer: {
    marginBottom: 24,
  },
  taxTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray[600],
    marginBottom: 8,
  },
  documentsContainer: {
    marginBottom: 24,
  },
  documentsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray[600],
    marginBottom: 8,
  },
  documentItem: {
    fontSize: 14,
    color: colors.gray[600],
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.gray[100],
    borderRadius: 4,
  },
  noDocuments: {
    fontSize: 14,
    fontStyle: "italic",
    marginVertical: 12,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.red[100],
    padding: 16,
    borderRadius: 8,
    gap: 8,
    marginTop: 12,
  },
  addImageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.red[100],
    padding: 16,
    borderRadius: 8,
    gap: 8,
    marginTop: 12,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: '#fff',
  },
});

export default styles;
