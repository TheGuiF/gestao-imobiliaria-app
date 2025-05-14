import { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';

import Feather from '@expo/vector-icons/Feather';

import InputField from '../../components/input';
import RedButton from '../../components/redButton';
import styles from './styles';

const CardCreationScreen2 = ({ navigation }) => {
  const [endereco, setEndereco] = useState('');
  const [area, setArea] = useState('');
  const [dormitorios, setDormitorios] = useState('');
  const [garagens, setGaragens] = useState('');

  const combinedFunctions = () => {
    navigation.navigate('Home'); //Volta para a página inicial

    Alert.alert('Adicionado', 'O imóvel foi incluido ao catálogo com sucesso!', [
      {text: 'OK'},  //Atribui uma notificação de Conclusão
    ]);

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logo}>
        <Feather name="home" size={70} color={"red"}/>   
      </View>
      <View style={styles.card}>
        <InputField label="Valor da Venda:" value={endereco} onChangeText={setEndereco} />
        <InputField label="Situação:" value={area} onChangeText={setArea} />
        <InputField label="Taxa de IPTU anual:" value={dormitorios} onChangeText={setDormitorios} />
        <InputField label="Tipo de Imóvel:" value={garagens} onChangeText={setGaragens} />
        <RedButton title="Finalizar" onPress={combinedFunctions} />
      </View>
    </ScrollView>
  );
};

export default CardCreationScreen2;