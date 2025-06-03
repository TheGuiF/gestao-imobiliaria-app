import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from '../styles/colors';

import HomeScreen from '../screens/home/home';
import CatalogScreen from '../screens/catalog';
import DetailScreen from '../screens/details';
import FormScreen from '../screens/form/cardCreation1';
import CardCreationScreen2 from '../screens/form/cardCreation2';
import CardCreationScreen3 from '../screens/form/cardCreation3';
import EditPropertyScreen from '../screens/editProperty';
import EditImagesScreen from '../screens/editImages';
import ClientesScreen from '../screens/clientes';
import ClienteFormScreen from '../screens/clientes/form';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.red[100],
        tabBarInactiveTintColor: colors.gray[600],
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Catálogo"
        component={CatalogScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="view-list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Clientes"
        component={ClientesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabRoutes"
        component={TabRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: "Detalhes",
        }}
        />
        <Stack.Screen
          name="Catálogo"
          component={CatalogScreen}
          options={{
            title: "retornar",
          }}
      />
      <Stack.Screen
        name="Form"
        component={FormScreen}
        options={{
          title: "Novo Imóvel",
        }}
      />
      <Stack.Screen
        name="CardCreation2"
        component={CardCreationScreen2}
        options={{
          title: "Novo Imóvel",
        }}
      />
      <Stack.Screen
        name="CardCreation3"
        component={CardCreationScreen3}
        options={{
          title: "Novo Imóvel",
        }}
      />
      <Stack.Screen
        name="EditProperty"
        component={EditPropertyScreen}
        options={{
          title: "Editar Imóvel",
        }}
      />
      <Stack.Screen
        name="EditImages"
        component={EditImagesScreen}
        options={{
          title: "Editar Imagens",
        }}
      />
      <Stack.Screen
        name="NovoCliente"
        component={ClienteFormScreen}
        options={{
          title: "Novo Cliente",
        }}
      />
      <Stack.Screen
        name="EditarCliente"
        component={ClienteFormScreen}
        options={{
          title: "Editar Cliente",
        }}
      />
    </Stack.Navigator>
  );
} 