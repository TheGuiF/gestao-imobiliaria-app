//tela de detalhes do imovel, da pra editar e deletar, 
//o envio da documentacao tbm é por aqui
import { useLayoutEffect, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { useCardCreation } from "../../contexts/cardCreationContext";
import DeleteButton from "../../components/deleteButton";
import { Separator } from "../../components/separator";
import CustomAlert from "../../components/customAlert";
import SwiperComponent from "../../components/swiper";
import InfoItem from "../../components/infoItem";
import { colors } from "../../styles/colors";
import styles from "./styles";

const DetailScreen = ({ route, navigation }) => {
  const { imovel: initialImovel } = route.params;
  const { buscarImovelPorId, atualizarImovel } = useCardCreation();
  const [imovel, setImovel] = useState(initialImovel);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  //atualiza os dados do imovel ao abrir a tela ou quando o id muda
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

  // configura os botões de editar e deletar no header
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
            <Feather name="edit" size={22} color={colors.gray[600]} />
          </TouchableOpacity>
          <DeleteButton
            imovelId={imovel.id}
            onSuccess={() => navigation.goBack()}
          />
        </View>
      ),
    });
  }, [navigation, imovel]);

  //imagem padrao do imovel se n for adicionada previamente
  const defaultImage = require("../../assets/default.png");

  //formata o valor do imovel, coloca pontos e virgulas
  const formatCurrency = (value) => {
    if (!value) return "0";
    return value
      .toString()
      .replace(/\D/g, "")
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  //adiciona um documento ao imovel
  const handleAddDocument = async () => {
    try {
      console.log("Iniciando seleção de documento...");
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedDoc = result.assets[0];
        const fileName = selectedDoc.name;
        const newPath = `${FileSystem.documentDirectory}pdfs/${fileName}`;

        await FileSystem.makeDirectoryAsync(
          `${FileSystem.documentDirectory}pdfs`,
          {
            intermediates: true,
          }
        );

        await FileSystem.copyAsync({
          from: selectedDoc.uri,
          to: newPath,
        });

        const newDoc = {
          uri: newPath,
          name: fileName,
          type: "pdf",
        };

        const updatedImovel = {
          ...imovel,
          documentos: [...(imovel.documentos || []), newDoc],
        };

        await atualizarImovel(imovel.id, updatedImovel);
        setImovel(updatedImovel);
        setAlertTitle("Sucesso!");
        setAlertMessage("Documento adicionado!");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Erro ao adicionar documento:", error);
      setAlertTitle("Erro");
      setAlertMessage(
        "Não foi possível adicionar o documento. " + error.message
      );
      setShowAlert(true);
    }
  };

  //adiciona uma imagem ao imovel
  const handleAddImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        setAlertTitle("Aviso");
        setAlertMessage("Permita acesso à galeria para adicionar imagens.");
        setShowAlert(true);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const fileName = `image_${Date.now()}.jpg`;
        const newPath = `${FileSystem.documentDirectory}images/${fileName}`;

        await FileSystem.makeDirectoryAsync(
          `${FileSystem.documentDirectory}images`,
          {
            intermediates: true,
          }
        );

        await FileSystem.copyAsync({
          from: result.assets[0].uri,
          to: newPath,
        });

        const newImages = [...(imovel.imagens || []), newPath];
        const updatedImovel = { ...imovel, imagens: newImages };

        await atualizarImovel(imovel.id, updatedImovel);
        setImovel(updatedImovel);
        setAlertTitle("Sucesso!");
        setAlertMessage("Imagem adicionada!");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Erro ao adicionar imagem:", error);
      setAlertTitle("Erro");
      setAlertMessage("Não foi possível adicionar a imagem.");
      setShowAlert(true);
    }
  };

  //deleta uma imagem do imovel
  const handleDeleteImage = async (index) => {
    try {
      const imageToDelete = imovel.imagens[index];
      const newImages = imovel.imagens.filter((_, i) => i !== index);
      const updatedImovel = { ...imovel, imagens: newImages };

      await atualizarImovel(imovel.id, updatedImovel);

      try {
        await FileSystem.deleteAsync(imageToDelete);
      } catch (e) {
        console.warn("Erro ao deletar arquivo de imagem:", e);
      }

      setImovel(updatedImovel);
      Alert.alert("Sucesso", "Imagem removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover imagem:", error);
      Alert.alert("Erro", "Não foi possível remover a imagem.");
    }
  };

  //remove um documento do imovel
  const handleDeleteDocument = async (index) => {
    try {
      const docToDelete = imovel.documentos[index];
      const newDocs = imovel.documentos.filter((_, i) => i !== index);
      const updatedImovel = { ...imovel, documentos: newDocs };

      await atualizarImovel(imovel.id, updatedImovel);

      try {
        await FileSystem.deleteAsync(docToDelete.uri);
      } catch (e) {
        console.warn("Erro ao deletar arquivo do documento:", e);
      }

      setImovel(updatedImovel);
      Alert.alert("Sucesso", "Documento removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover documento:", error);
      Alert.alert("Erro", "Não foi possível remover o documento.");
    }
  };

  //abre um pdf do imovel
  const handleOpenDocument = async (uri) => {
    try {
      // ve se o arquivo existe
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        throw new Error("Arquivo não encontrado");
      }

      // pega o uri do arquivo
      const contentUri = await FileSystem.getContentUriAsync(uri);
      console.log("Content URI gerado:", contentUri);

      // tenta abrir o arquivo com o app padrao do sistema
      const supported = await Linking.canOpenURL(contentUri);
      if (supported) {
        await Linking.openURL(contentUri);
      } else {
        Alert.alert("Erro", "Não foi possível abrir o documento.");
      }
    } catch (error) {
      console.error("Erro ao abrir documento:", error);
      Alert.alert(
        "Erro",
        "Não foi possível abrir o documento. " + error.message
      );
    }
  };

  //se o imovel nao existir, retorna null
  if (!imovel) {
    return null;
  }

  //se o imovel existir, retorna a tela de detalhes
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

        <View style={styles.documentsContainer}>
          <Text style={styles.documentsTitle}>Documentos do Imóvel</Text>
          {imovel.documentos && imovel.documentos.length > 0 ? (
            imovel.documentos.map((doc, index) => (
              <View key={index} style={styles.documentItemContainer}>
                <TouchableOpacity
                  style={styles.documentItem}
                  onPress={() => handleOpenDocument(doc.uri)}
                >
                  <MaterialIcons
                    name="description"
                    size={24}
                    color={colors.gray[600]}
                  />
                  <Text style={styles.documentName}>{doc.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteDocument(index)}>
                  <Feather name="trash-2" size={20} color={colors.red[100]} />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noDocuments}>Nenhum documento adicionado.</Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.addButton, { marginBottom: 10 }]}
          onPress={handleAddImage}
        >
          <Text style={styles.addButtonText}>Adicionar Imagem</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddDocument}
        >
          <Text style={styles.addButtonText}>Adicionar PDF</Text>
        </TouchableOpacity>
      </View>

      <CustomAlert
        visible={showAlert}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
        icon="check-circle"
      />
    </ScrollView>
  );
};

export default DetailScreen;