import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/home/home";
import CardCreationScreen1 from "./src/screens/form/cardCreation1";
import CardCreationScreen2 from "./src/screens/form/cardCreation2";
import CatalogScreen from "./src/screens/catalog/index";
import DetailScreen from "./src/screens/details/index";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CardCreation1"
          component={CardCreationScreen1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CardCreation2"
          component={CardCreationScreen2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Catalog"
          component={CatalogScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{ headerTitle: "Detalhes da casa" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
