//rotas da app
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//telas
import HomeScreen from "../screens/home/home";
import CatalogScreen from "../screens/catalog";
import DetailScreen from "../screens/details";
import CardCreation1Screen from "../screens/form/cardCreation1";
import CardCreation2Screen from "../screens/form/cardCreation2";
import CardCreation3Screen from "../screens/form/cardCreation3";
import EditPropertyScreen from "../screens/editProperty";
import EditImagesScreen from "../screens/editImages";

const Stack = createNativeStackNavigator();

//rotas
export default function Routes() {
  return (
    <Stack.Navigator>
      {/* tela inicial */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* telas de criação de imóvel */}
      <Stack.Screen
        name="CardCreation1"
        component={CardCreation1Screen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CardCreation2"
        component={CardCreation2Screen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CardCreation3"
        component={CardCreation3Screen}
        options={{
          headerShown: false,
        }}
      />
      {/* tela de catálogo */}
      <Stack.Screen
        name="Catálogo"
        component={CatalogScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* tela de detalhes */}
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: "Detalhes",
        }}
      />
      {/* tela de edição de imóvel */}
      <Stack.Screen
        name="EditProperty"
        component={EditPropertyScreen}
        options={{
          title: "Editar Imóvel",
        }}
      />
      {/* tela de edição de imagens */}
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