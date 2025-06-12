//tela de edicao do itens do imovel
import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";

import { useCardCreation } from "../../contexts/cardCreationContext";
import CustomAlert from "../../components/customAlert";
import RedButton from "../../components/redButton";
import AddImages from "../../components/addImage";
import InputField from "../../components/input";
import SelectField from '../../components/selectField';
import styles from "./styles";

const EditPropertyScreen = ({ route, navigation }) => {
  const imovel = route.params?.imovel;
  const {
    atualizarImovel,
    formData,
    updateFormData,
    formatCurrency,
    formatArea,
  } = useCardCreation();
  const [localData, setLocalData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // carrega os dados do imovel selecionado e preenche os campos do formulário
  useEffect(() => {
    if (imovel) {
      const formattedData = {
        ...imovel,
        valorVenda: formatCurrency(imovel.valorVenda),
        iptu: formatCurrency(imovel.iptu),
        area: formatArea(imovel.area),
      };
      setLocalData(formattedData);
      updateFormData({
        ...imovel,
        imagens: imovel.imagens || [],
      });
    }
  }, [imovel]);

  if (!imovel) {
    navigation.goBack();
    return null;
  }

  // salva as alterações feitas no imóvel e mostra um alerta de sucesso ou erro
  const handleSave = async () => {
    try {
      const updatedImovel = {
        ...imovel,
        ...localData,
        imagens: formData.imagens || [],
        valorVenda:
          localData.valorVenda?.replace(/\D/g, "") || imovel.valorVenda,
        iptu: localData.iptu?.replace(/\D/g, "") || imovel.iptu,
        area: localData.area?.replace(/\D/g, "") || imovel.area,
      };

      await atualizarImovel(imovel.id, updatedImovel);
      setAlertTitle("Sucesso!");
      setAlertMessage("Imóvel atualizado!");
      setShowAlert(true);
    } catch (error) {
      console.error("Erro ao atualizar imóvel:", error);
      setAlertTitle("Erro");
      setAlertMessage("Não foi possível atualizar o imóvel.");
      setShowAlert(true);
    }
  };

  // formata o valor do imovel, coloca pontos e virgulas
  const handleInputChange = (field, value) => {
    let formattedValue = value;
    if (field === "valorVenda" || field === "iptu") {
      formattedValue = formatCurrency(value);
    } else if (field === "area") {
      formattedValue = formatArea(value);
    }

    setLocalData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }));

    updateFormData({
      [field]: formattedValue,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <InputField
          label="Endereço"
          value={localData.endereco}
          onChangeText={(value) => handleInputChange("endereco", value)}
        />
        <InputField
          label="Área (m²)"
          value={localData.area}
          onChangeText={(value) => handleInputChange("area", value.replace(/[^0-9]/g, ""))}
          keyboardType="numeric"
        />
        <InputField
          label="Dormitórios"
          value={localData.dormitorios}
          onChangeText={(value) => handleInputChange("dormitorios", value)}
          keyboardType="numeric"
        />
        <InputField
          label="Garagens"
          value={localData.garagens}
          onChangeText={(value) => handleInputChange("garagens", value)}
          keyboardType="numeric"
        />
          <SelectField
            label="Tipo do Imóvel"
            value={localData.tipoImovel}
            options={["Apartamento", "Casa", "Comercial", "Sítio", "Lote", "Armazém"]}
            onChange={(value) => handleInputChange("tipoImovel", value)}
          />
          <SelectField
            label="Situação"
            value={localData.situacao}
            options={["Disponível", "Indisponível"]}
            onChange={(value) => handleInputChange("situacao", value)}
          />
        <InputField
          label="Valor de Venda (R$)"
          value={localData.valorVenda}
          onChangeText={(value) => handleInputChange("valorVenda", value)}
          keyboardType="numeric"
        />
        <InputField
          label="IPTU Anual (R$)"
          value={localData.iptu}
          onChangeText={(value) => handleInputChange("iptu", value)}
          keyboardType="numeric"
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
        onClose={() => {
          setShowAlert(false);
          if (alertTitle === "Sucesso!") {
            navigation.goBack();
          }
        }}
        icon="check-circle"
      />
    </ScrollView>
  );
};

export default EditPropertyScreen;