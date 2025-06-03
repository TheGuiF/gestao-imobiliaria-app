import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useClientes } from '../../contexts/clientesContext';
import InputField from '../../components/input';
import RedButton from '../../components/redButton';
import { colors } from '../../styles/colors';

const ClienteFormScreen = ({ route, navigation }) => {
  const cliente = route.params?.cliente;
  const isEditing = !!cliente;
  const { adicionarCliente, atualizarClienteExistente } = useClientes();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    interesse: '',
    observacoes: '',
  });

  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    }
  }, [cliente]);

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar Cliente' : 'Novo Cliente',
    });
  }, [navigation, isEditing]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatTelefone = (telefone) => {
    const cleaned = telefone.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length >= 11) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    } else if (cleaned.length >= 7) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length >= 2) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    }
    return formatted;
  };

  const handleSave = async () => {
    try {
      if (!formData.nome || !formData.email || !formData.telefone) {
        Alert.alert('Erro', 'Por favor, preencha os campos obrigatórios (nome, email e telefone).');
        return;
      }

      const clienteData = {
        ...formData,
        telefone: formatTelefone(formData.telefone),
      };

      if (isEditing) {
        await atualizarClienteExistente(cliente.id, clienteData);
      } else {
        await adicionarCliente(clienteData);
      }

      Alert.alert(
        'Sucesso',
        `Cliente ${isEditing ? 'atualizado' : 'cadastrado'} com sucesso!`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Erro', `Não foi possível ${isEditing ? 'atualizar' : 'cadastrar'} o cliente.`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <InputField
          label="Nome*"
          value={formData.nome}
          onChangeText={(value) => handleInputChange('nome', value)}
          placeholder="Nome completo"
        />
        <InputField
          label="Email*"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          placeholder="email@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <InputField
          label="Telefone*"
          value={formData.telefone}
          onChangeText={(value) => handleInputChange('telefone', formatTelefone(value))}
          placeholder="(00) 00000-0000"
          keyboardType="numeric"
        />
        <InputField
          label="Cidade"
          value={formData.cidade}
          onChangeText={(value) => handleInputChange('cidade', value)}
          placeholder="Nome da cidade"
        />
        <InputField
          label="Interesse"
          value={formData.interesse}
          onChangeText={(value) => handleInputChange('interesse', value)}
          placeholder="Ex: Casa, Apartamento, Terreno"
        />
        <InputField
          label="Observações"
          value={formData.observacoes}
          onChangeText={(value) => handleInputChange('observacoes', value)}
          placeholder="Observações adicionais"
          multiline
          numberOfLines={4}
          style={styles.observacoesInput}
        />

        <RedButton
          title={isEditing ? "Salvar Alterações" : "Cadastrar Cliente"}
          onPress={handleSave}
          style={{ marginTop: 20 }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[200],
  },
  content: {
    padding: 16,
    gap: 16,
  },
  observacoesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default ClienteFormScreen; 