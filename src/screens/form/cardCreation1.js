import { useState } from 'react';
import { View, ScrollView } from 'react-native';

import Feather from '@expo/vector-icons/Feather';

import InputField from '../../components/input';
import RedButton from '../../components/redButton';
import styles from './styles';

const CardCreationScreen1 = ({ navigation }) => {
  const [endereco, setEndereco] = useState('');
  const [area, setArea] = useState('');
  const [dormitorios, setDormitorios] = useState('');
  const [garagens, setGaragens] = useState('');

  const handleContinuar = () => {
    navigation.navigate('Card2'); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.logo}>
        <Feather name="home" size={70} color={"red"}/>
      </View>

      <View style={styles.card}>
        <InputField 
          label="Endereço do Imóvel:"
          value={endereco} 
          onChangeText={setEndereco} 
        />
        <InputField 
          label="Tamanho da área construída:" 
          value={area} 
          onChangeText={setArea} 
        />
        <InputField 
          label="Quantidade de Dormitórios:" 
          value={dormitorios} 
          onChangeText={setDormitorios} 
        />
        <InputField 
          label="Quantidade de Garagens:" 
          value={garagens} 
          onChangeText={setGaragens} 
        />

        <RedButton title="Continuar" onPress={handleContinuar} />
      </View>

    </ScrollView>
  );
};

export default CardCreationScreen1;