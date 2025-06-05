import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import * as DocumentPicker from "expo-document-picker";

import { useCardCreation } from "../../contexts/cardCreationContext";
import { Separator } from "../../components/separator";
import SwiperComponent from "../../components/swiper";
import InfoItem from "../../components/infoItem";
import DeleteButton from "../../components/deleteButton";
import { colors } from "../../styles/colors";
import styles from "./styles";

const DetailScreen = ({ navigation }) => {
  const route = useRoute();
  const initialImovel = route?.params?.imovel;

  const { deletarImovel, buscarImovelPorId } = useCardCreation();
  const [imovel, setImovel] = useState(initialImovel);
  const [modalVisible, setModalVisible] = useState(false);
  const [documents, setDocuments] = useState([]);

  if (!initialImovel) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Nenhum imóvel selecionado.</Text>
      </View>
    );
  }

  useEffect(() => {
    const refreshImovel = async () => {
      if (imovel?.id) {
        const updatedImovel = await buscarImovelPorId(imovel.id);
        if (updatedImovel) {
          setImovel(updatedImovel);
        }
      }
    };
    refreshImovel();
  }, [imovel?.id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", gap: 16, marginRight: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProperty", { imovel })}
          >
            <Feather name="edit" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Feather name="trash-2" size={22} color="red" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, imovel]);

  const defaultImage = require("../../assets/default.png");

  const formatCurrency = (value) => {
    if (!value) return "0,00";
    const number = parseFloat(value.toString().replace(/\D/g, "")) / 100;
    return number.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleAddDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.type === "success") {
        setDocuments((prev) => [...prev, result]);
        Alert.alert("Sucesso", "Documento adicionado com sucesso!");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar o documento.");
    }
  };

  const handleAddImage = async () => {
    Alert.alert("Imagem", "Funcionalidade ainda não implementada.");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.swiperContent}>
        <SwiperComponent
          images={imovel.imagens?.length > 0 ? imovel.imagens : [defaultImage]}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{imovel.tipoImovel}</Text>
        <Text style={styles.price}>R$ {formatCurrency(imovel.valorVenda)}</Text>

        <View style={styles.infoContainer}>
          <InfoItem
            icon={<FontAwesome name="bed" size={24} color={colors.gray[600]} />}
            label="Dormitórios:"
            value={imovel.dormitorios}
          />
          <InfoItem
            icon={<FontAwesome name="car" size={24} color={colors.gray[600]} />}
            label="Garagens:"
            value={imovel.garagens}
          />
          <InfoItem
            icon={
              <MaterialIcons
                name="square-foot"
                size={26}
                color={colors.gray[600]}
              />
            }
            label="Área Construída:"
            value={`${imovel.area}m²`}
          />
          <InfoItem
            icon={
              <FontAwesome
                name="check-circle"
                size={28}
                color={colors.gray[600]}
              />
            }
            label="Situação:"
            value={imovel.situacao}
          />
        </View>
      </View>

      <Separator />

      <View style={styles.taxContainer}>
        <Text style={styles.taxTitle}>Taxas</Text>

        <Separator width="80%" />
        <View style={styles.taxContentInfo}>
          <Text style={styles.taxInfo}>IPTU Anual</Text>
          <Text style={[styles.taxInfo, { color: colors.red[200] }]}>
            R$ {formatCurrency(imovel.iptu)}
          </Text>
        </View>
        <Separator width="80%" />
      </View>

      <Separator />

      <DeleteButton
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onConfirm={async () => {
          try {
            await deletarImovel(imovel.id);
            setModalVisible(false);
            navigation.goBack();
          } catch (error) {
            setModalVisible(false);
            console.error("Erro ao deletar imóvel:", error);
            Alert.alert("Erro", "Não foi possível excluir o imóvel.");
          }
        }}
      />
    </ScrollView>
  );
};

export default DetailScreen;
