import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import styles from "./styles";

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

