//import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import MaterialIcons from "@expo/vector-icons/MaterialIcons";
//import { colors } from '../styles/colors';

import HomeScreen from "../screens/home/home";
import CatalogScreen from "../screens/catalog";
import DetailScreen from "../screens/details";
import CardCreationScreen1 from "../screens/form/cardCreation1";
import CardCreationScreen2 from "../screens/form/cardCreation2";
import CardCreationScreen3 from "../screens/form/cardCreation3";
import EditPropertyScreen from "../screens/editProperty";
import EditImagesScreen from "../screens/editImages";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailScreen}
        options={{
          title: "Detalhes",
        }}
      />
      <Stack.Screen
        name="Catalog"
        component={CatalogScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CardCreation1"
        component={CardCreationScreen1}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CardCreation2"
        component={CardCreationScreen2}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CardCreation3"
        component={CardCreationScreen3}
        options={{
          headerShown: false,
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
    </Stack.Navigator>
  );
}
