import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/home/home'
import CardScreen from './src/screens/form/card'

const Stack = createNativeStackNavigator()

 function App() {
     return (
     <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Card' component={CardScreen} />
         </Stack.Navigator>
     </NavigationContainer>
     );
 }

 export default App;
