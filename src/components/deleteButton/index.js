import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../styles/colors";

const DeleteButton = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Excluir Imóvel</Text>
          <Text style={styles.message}>
            Tem certeza que deseja excluir este imóvel? Essa ação não pode ser desfeita.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>Sim, excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteButton;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "85%",
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.red[100],
  },
  message: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.gray[300],
    borderRadius: 6,
  },
  confirmButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.red[100],
    borderRadius: 6,
  },
  cancelText: {
    color: colors.gray[800],
    fontWeight: "600",
  },
  confirmText: {
    color: "white",
    fontWeight: "600",
  },
});