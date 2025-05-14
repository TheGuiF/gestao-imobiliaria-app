import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/home/home'
import CardCreationScreen1 from './src/screens/form/cardCreation1'
import CardCreationScreen2 from './src/screens/form/cardCreation2'

const Stack = createNativeStackNavigator()

 function App() {
     return (
     <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Card1' component={CardCreationScreen1} options={{headerShown: false}}/>
            <Stack.Screen name='Card2' component={CardCreationScreen2} options={{headerShown: false}}/>
         </Stack.Navigator>
     </NavigationContainer>
     );
 }

 export default App;
