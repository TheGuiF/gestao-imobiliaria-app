import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'


export default function HomeScreen({navigation}){
  return(
    <View style={styles.container}>
      <Text style={styles.quote}>
        Gerencie seus imóveis com mais agilidade e precisão
      </Text>

        <Button title='Ir para Card' onPress={() => navigation.navigate('Card')} />
      
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Adicionar Imóvel
          </Text>
        </TouchableOpacity>
      </View>

      <View sytle={styles.navigation}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Catalogo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Clientes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "grey",
    justifyContent: 'center', 
    alignItems: 'center',
  },
  quote:{
    textAlign: 'center',
    fontWeight: 'bold',
    width: '80%',
    fontSize: 24,
    marginBottom: 40,
  },
  button:{
    backgroundColor: 'white',
    width: 300,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 18,
  },
  buttonText:{
    color: "red",
    fontSize: 25,
    fontWeight: 'bold'
  },
  navigation:{
    textAlign: 'right'
  }
})