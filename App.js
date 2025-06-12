import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CardCreationProvider } from './src/contexts/cardCreationContext';
import { initDatabase } from './src/services/sqlite';
import Routes from './src/routes';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initApp = async () => {
      try {
        console.log('Iniciando inicialização do banco de dados...');
        await initDatabase();
        console.log('Banco de dados inicializado com sucesso');
        setIsReady(true);
      } catch (err) {
        console.error('Erro ao inicializar banco de dados:', err);
        setError(err.message);
      }
    };

    initApp();
  }, []);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Erro ao inicializar o app: {error}</Text>
      </View>
    );
  }

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <CardCreationProvider>
        <Routes />
      </CardCreationProvider>
    </NavigationContainer>
  );
}
