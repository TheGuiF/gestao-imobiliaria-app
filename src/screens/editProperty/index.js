import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useCardCreation } from '../../contexts/cardCreationContext';
import InputField from '../../components/input';
import RedButton from '../../components/redButton';
import AddImages from '../../components/addImage';
import styles from './styles';

const EditPropertyScreen = ({ route, navigation }) => {
  const imovel = route.params?.imovel;
  const { atualizarImovel, formData, updateFormData } = useCardCreation();
  const [localData, setLocalData] = useState({});

  const formatCurrencyBR = (value) => {
    if (!value) return '';
    const onlyDigits = value.replace(/\D/g, '');
    const number = parseFloat(onlyDigits) / 100;
    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatArea = (value) => {
    if (!value) return '';
    return value.toString().replace(/\D/g, '');
  };

  useEffect(() => {
    if (imovel) {
      const formattedData = {
        ...imovel,
        valorVenda: formatCurrencyBR(imovel.valorVenda.toString()),
        iptu: formatCurrencyBR(imovel.iptu?.toString() || ''),
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
      const parseMoeda = (valor) => valor?.replace(/\D/g, '');

      const updatedImovel = {
        ...imovel,
        ...localData,
        imagens: formData.imagens || [],
        valorVenda: parseMoeda(localData.valorVenda),
        iptu: parseMoeda(localData.iptu),
        area: parseMoeda(localData.area),
      };

      await atualizarImovel(imovel.id, updatedImovel);
      Alert.alert('Sucesso', 'Imóvel atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar imóvel:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o imóvel.');
    }
  };

  const handleInputChange = (field, value) => {
    let formattedValue = value;

    if (field === 'valorVenda' || field === 'iptu') {
      formattedValue = formatCurrencyBR(value);
    } else if (field === 'area') {
      formattedValue = formatArea(value);
    }

    setLocalData((prev) => ({
      ...prev,
      [field]: formattedValue,
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
    </ScrollView>
  );
};

export default EditPropertyScreen;
