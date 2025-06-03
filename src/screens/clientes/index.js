import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useClientes } from '../../contexts/clientesContext';
import { colors } from '../../styles/colors';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { useLayoutEffect } from 'react';

const ClientesScreen = ({ navigation }) => {
  const { clientes, loading, inicializarClientes, removerCliente } = useClientes();

  useEffect(() => {
    inicializarClientes();
  }, [inicializarClientes]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate('NovoCliente')}
        >
          <Feather name="user-plus" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleDeleteCliente = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este cliente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await removerCliente(id);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o cliente.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitle}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditarCliente', { cliente: item })}
            style={styles.actionButton}
          >
            <Feather name="edit" size={20} color={colors.gray[600]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteCliente(item.id)}
            style={styles.actionButton}
          >
            <Feather name="trash-2" size={20} color={colors.red[100]} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardInfo}>
        <View style={styles.infoItem}>
          <MaterialIcons name="phone" size={16} color={colors.gray[600]} />
          <Text style={styles.infoText}>{item.telefone}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="location-on" size={16} color={colors.gray[600]} />
          <Text style={styles.infoText}>{item.cidade}</Text>
        </View>
        {item.interesse && (
          <View style={styles.infoItem}>
            <MaterialIcons name="home" size={16} color={colors.gray[600]} />
            <Text style={styles.infoText}>
              Interesse: {item.interesse}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (clientes.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Nenhum cliente cadastrado</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('NovoCliente')}
        >
          <Text style={styles.addButtonText}>Adicionar Cliente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={clientes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray[800],
  },
  email: {
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 2,
  },
  cardInfo: {
    gap: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.gray[700],
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: colors.red[100],
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
})

export default ClientesScreen; 