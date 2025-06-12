//Componente de alerta customizado que serve pra exibir mensagens de sucesso ou erro
//Ele exibe um modal com um icone, titulo, mensagem e um botão de fechar
import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import styles from "./styles";

const CustomAlert = ({
  visible,
  title,
  message,
  onClose,
  icon = "alert-circle",
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Feather name={icon} size={40} color={colors.red[100]} />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;