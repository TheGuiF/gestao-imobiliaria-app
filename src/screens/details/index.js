import { useLayoutEffect, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import * as DocumentPicker from 'expo-document-picker';

import { Separator } from "../../components/separator";
import SwiperComponent from "../../components/swiper";
import InfoItem from "../../components/infoItem";
import { colors } from "../../styles/colors";
import { useCardCreation } from "../../contexts/cardCreationContext";
import styles from "./styles";

const DetailScreen = ({ route, navigation }) => {
  const { imovel: initialImovel } = route.params;
  const { deletarImovel, buscarImovelPorId } = useCardCreation();
  const [imovel, setImovel] = useState(initialImovel);
  const [documents, setDocuments] = useState([]);

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
            onPress={() => {
              if (imovel) {
                navigation.navigate("EditProperty", { imovel });
              }
            }}
          >
            <Feather name="edit" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Compartilhar")}>
            <MaterialIcons name="share" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              try {
                await deletarImovel(imovel.id);
                navigation.goBack();
              } catch (error) {
                console.error("Erro ao deletar imóvel:", error);
              }
            }}
          >
            <Feather name="trash-2" size={22} color="red" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, deletarImovel, imovel]);

  const defaultImage = require("../../assets/default.png");

  const formatCurrency = (value) => {
    if (!value) return '0';
    return value.toString().replace(/\D/g, '')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  const handleAddDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        setDocuments(prev => [...prev, result]);
        Alert.alert('Sucesso', 'Documento adicionado com sucesso!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o documento.');
    }
  };

  const handleAddImage = async () => {
    // Implement image upload functionality
  };

  if (!imovel) {
    return null;
  }

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

        <View style={styles.taxContainer}>
          <Text style={styles.taxTitle}>Taxas</Text>
          <Separator />
          <InfoItem
            icon={<MaterialIcons name="attach-money" size={24} color={colors.gray[600]} />}
            label="IPTU Anual:"
            value={`R$ ${formatCurrency(imovel.iptu)}`}
          />
        </View>

        <View style={styles.documentsContainer}>
          <Text style={styles.documentsTitle}>Documentos do Imóvel</Text>
          <Separator />
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <Text key={index} style={styles.documentItem}>{doc.name}</Text>
            ))
          ) : (
            <Text style={styles.noDocuments}>Nenhum documento adicionado.</Text>
          )}
          <TouchableOpacity style={styles.addButton} onPress={handleAddDocument}>
            <MaterialIcons name="add" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Adicionar PDF</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
          <MaterialIcons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Adicionar Imagem</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
