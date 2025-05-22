import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { CardCreationProvider } from "./src/contexts/cardCreationContext";
import HomeScreen from "./src/screens/home/home";
import CardCreationScreen1 from "./src/screens/form/cardCreation1";
import CardCreationScreen2 from "./src/screens/form/cardCreation2";
import CardCreationScreen3 from "./src/screens/form/cardCreation3";
import CatalogScreen from "./src/screens/catalog/index";
import DetailScreen from "./src/screens/details/index";
import DeleteButton from "./src/components/deleteButton";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <CardCreationProvider>
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
            name="CardCreation3"
            component={CardCreationScreen3}
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
            options={({ navigation }) => ({
              title: "Detalhes",
              headerRight: () => (
                <View
                  style={{ flexDirection: "row", gap: 16, marginRight: 10 }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("EditImages")}
                  >
                    <Feather name="edit" size={22} color="black" />
                  </TouchableOpacity>
                  <DeleteButton/>
                </View>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CardCreationProvider>
  );
}

export default App;
