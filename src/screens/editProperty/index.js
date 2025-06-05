import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useCardCreation } from '../../contexts/cardCreationContext';
import InputField from '../../components/input';
import RedButton from '../../components/redButton';
import AddImages from '../../components/addImage';
import CustomAlert from '../../components/customAlert';
import styles from './styles';

const EditPropertyScreen = ({ route, navigation }) => {
  const imovel = route.params?.imovel;
  const { atualizarImovel, formData, updateFormData } = useCardCreation();
  const [localData, setLocalData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const formatCurrency = (value) => {
    if (!value) return '';
    return value.toString().replace(/\D/g, '')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  const formatArea = (value) => {
    if (!value) return '';
    return value.toString().replace(/\D/g, '');
  };

  useEffect(() => {
    if (imovel) {
      const formattedData = {
        ...imovel,
        valorVenda: formatCurrency(imovel.valorVenda),
        area: formatArea(imovel.area),
      };
      setLocalData(formattedData);
      updateFormData({
        ...imovel,
        imagens: imovel.imagens || []
      });
    }
  }, [imovel]);

  if (!imovel) {
    navigation.goBack();
    return null;
  }

  const handleSave = async () => {
    try {
      const updatedImovel = {
        ...imovel,
        ...localData,
        imagens: formData.imagens || [],
        valorVenda: localData.valorVenda?.replace(/\D/g, '') || imovel.valorVenda,
        area: localData.area?.replace(/\D/g, '') || imovel.area,
        iptu: localData.iptu?.replace(/\D/g, '') || imovel.iptu,
      };

      await atualizarImovel(imovel.id, updatedImovel);
      setAlertTitle('Aviso');
      setAlertMessage('Imóvel atualizado com sucesso!');
      setShowAlert(true);
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error) {
      console.error('Erro ao atualizar imóvel:', error);
      setAlertTitle('Erro');
      setAlertMessage('Não foi possível atualizar o imóvel.');
      setShowAlert(true);
    }
  };

  const handleInputChange = (field, value) => {
    let formattedValue = value;
    if (field === 'valorVenda' || field === 'iptu') {
      formattedValue = formatCurrency(value);
    } else if (field === 'area') {
      formattedValue = formatArea(value);
    }
    
    setLocalData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <InputField
          label="Endereço"
          value={localData.endereco}
          onChangeText={(value) => handleInputChange('endereco', value)}
        />
        <InputField
          label="Área (m²)"
          value={localData.area}
          onChangeText={(value) => handleInputChange('area', value)}
          keyboardType="numeric"
        />
        <InputField
          label="Dormitórios"
          value={localData.dormitorios}
          onChangeText={(value) => handleInputChange('dormitorios', value)}
          keyboardType="numeric"
        />
        <InputField
          label="Garagens"
          value={localData.garagens}
          onChangeText={(value) => handleInputChange('garagens', value)}
          keyboardType="numeric"
        />
        <InputField
          label="Valor de Venda (R$)"
          value={localData.valorVenda}
          onChangeText={(value) => handleInputChange('valorVenda', value)}
          keyboardType="numeric"
        />
        <InputField
          label="Situação"
          value={localData.situacao}
          onChangeText={(value) => handleInputChange('situacao', value)}
        />
        <InputField
          label="IPTU Anual (R$)"
          value={localData.iptu}
          onChangeText={(value) => handleInputChange('iptu', value)}
          keyboardType="numeric"
        />
        <InputField
          label="Tipo do Imóvel"
          value={localData.tipoImovel}
          onChangeText={(value) => handleInputChange('tipoImovel', value)}
        />
        
        <AddImages initialImages={imovel.imagens || []} />
        
        <RedButton 
          title="Salvar Alterações" 
          onPress={handleSave}
          style={{ marginTop: 20 }} 
        />
      </View>

      <CustomAlert
        visible={showAlert}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
      />
    </ScrollView>
  );
};

export default EditPropertyScreen; 