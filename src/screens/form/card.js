import * as React from 'react';
 import { View, Text, Button } from 'react-native';

 function CardScreen({navigation}) {
     return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Card Screen</Text>
         <Button title='Ir para Home' onPress={() => navigation.navigate('Home')} />
     </View>
     );
 }

 export default CardScreen;