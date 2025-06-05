import { useLayoutEffect, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Linking,
  Platform,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';

import { Separator } from "../../components/separator";
import SwiperComponent from "../../components/swiper";
import InfoItem from "../../components/infoItem";
import CustomAlert from "../../components/customAlert";
import { colors } from "../../styles/colors";
import { useCardCreation } from "../../contexts/cardCreationContext";
import styles from "./styles";

const DetailScreen = ({ route, navigation }) => {
  const { imovel: initialImovel } = route.params;
  const { deletarImovel, buscarImovelPorId, atualizarImovel } = useCardCreation();
  const [imovel, setImovel] = useState(initialImovel);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

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
          <TouchableOpacity
            onPress={async () => {
              try {
                await deletarImovel(imovel.id);
                navigation.goBack();
              } catch (error) {
                console.error("Erro ao deletar imóvel:", error);
                Alert.alert("Erro", "Não foi possível deletar o imóvel.");
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
      console.log('Iniciando seleção de documento...');
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedDoc = result.assets[0];
        const fileName = selectedDoc.name;
        const newPath = `${FileSystem.documentDirectory}pdfs/${fileName}`;
        
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}pdfs`, {
          intermediates: true
        });

        await FileSystem.copyAsync({
          from: selectedDoc.uri,
          to: newPath
        });

        const newDoc = {
          uri: newPath,
          name: fileName,
          type: 'pdf'
        };
        
        const updatedImovel = {
          ...imovel,
          documentos: [...(imovel.documentos || []), newDoc]
        };
        
        await atualizarImovel(imovel.id, updatedImovel);
        setImovel(updatedImovel);
        setAlertTitle('Aviso');
        setAlertMessage('Documento adicionado com sucesso!');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Erro ao adicionar documento:', error);
      setAlertTitle('Erro');
      setAlertMessage('Não foi possível adicionar o documento. ' + error.message);
      setShowAlert(true);
    }
  };

  const handleAddImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        setAlertTitle('Aviso');
        setAlertMessage('Permita acesso à galeria para adicionar imagens.');
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
        
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}images`, {
          intermediates: true
        });

        await FileSystem.copyAsync({
          from: result.assets[0].uri,
          to: newPath
        });

        const newImages = [...(imovel.imagens || []), newPath];
        const updatedImovel = { ...imovel, imagens: newImages };
        
        await atualizarImovel(imovel.id, updatedImovel);
        setImovel(updatedImovel);
        setAlertTitle('Aviso');
        setAlertMessage('Imagem adicionada com sucesso!');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Erro ao adicionar imagem:', error);
      setAlertTitle('Erro');
      setAlertMessage('Não foi possível adicionar a imagem.');
      setShowAlert(true);
    }
  };

  const handleDeleteImage = async (index) => {
    try {
      const imageToDelete = imovel.imagens[index];
      const newImages = imovel.imagens.filter((_, i) => i !== index);
      const updatedImovel = { ...imovel, imagens: newImages };
      
      await atualizarImovel(imovel.id, updatedImovel);
      
      // Delete the file from storage
      try {
        await FileSystem.deleteAsync(imageToDelete);
      } catch (e) {
        console.warn('Erro ao deletar arquivo de imagem:', e);
      }
      
      setImovel(updatedImovel);
      Alert.alert('Sucesso', 'Imagem removida com sucesso!');
    } catch (error) {
      console.error('Erro ao remover imagem:', error);
      Alert.alert('Erro', 'Não foi possível remover a imagem.');
    }
  };

  const handleDeleteDocument = async (index) => {
    try {
      const docToDelete = imovel.documentos[index];
      const newDocs = imovel.documentos.filter((_, i) => i !== index);
      const updatedImovel = { ...imovel, documentos: newDocs };
      
      await atualizarImovel(imovel.id, updatedImovel);
      
      // Delete the file from storage
      try {
        await FileSystem.deleteAsync(docToDelete.uri);
      } catch (e) {
        console.warn('Erro ao deletar arquivo do documento:', e);
      }
      
      setImovel(updatedImovel);
      Alert.alert('Sucesso', 'Documento removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover documento:', error);
      Alert.alert('Erro', 'Não foi possível remover o documento.');
    }
  };

  const handleOpenDocument = async (uri) => {
    try {
      if (Platform.OS === 'android') {
        console.log('Tentando abrir documento:', uri);
        
        // Check if file exists
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (!fileInfo.exists) {
          throw new Error('Arquivo não encontrado');
        }

        // Get content URI for the file
        const contentUri = await FileSystem.getContentUriAsync(uri);
        console.log('Content URI gerado:', contentUri);

        // Use IntentLauncher to open the PDF with the content URI
        await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
          data: contentUri,
          flags: 1,
          type: 'application/pdf'
        });
      } else {
        // For iOS
        const supported = await Linking.canOpenURL(uri);
        if (supported) {
          await Linking.openURL(uri);
        } else {
          Alert.alert('Erro', 'Não foi possível abrir o documento.');
        }
      }
    } catch (error) {
      console.error('Erro ao abrir documento:', error);
      Alert.alert('Erro', 'Não foi possível abrir o documento. ' + error.message);
    }
  };

  const OptionsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showOptionsModal}
      onRequestClose={() => setShowOptionsModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Opções</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setShowOptionsModal(false);
              handleAddImage();
            }}
          >
            <MaterialIcons name="photo-library" size={24} color="#fff" />
            <Text style={styles.modalButtonText}>Adicionar Imagem</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setShowOptionsModal(false);
              handleAddDocument();
            }}
          >
            <MaterialIcons name="attach-file" size={24} color="#fff" />
            <Text style={styles.modalButtonText}>Adicionar PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: colors.gray[400] }]}
            onPress={() => setShowOptionsModal(false)}
          >
            <Text style={styles.modalButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

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
          {imovel.documentos && imovel.documentos.length > 0 ? (
            imovel.documentos.map((doc, index) => (
              <View key={index} style={styles.documentItemContainer}>
                <TouchableOpacity 
                  style={styles.documentItem}
                  onPress={() => handleOpenDocument(doc.uri)}
                >
                  <MaterialIcons name="description" size={24} color={colors.gray[600]} />
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
          style={styles.addButton}
          onPress={() => setShowOptionsModal(true)}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Adicionar Arquivo/Imagem</Text>
        </TouchableOpacity>
      </View>

      <CustomAlert
        visible={showAlert}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
      />
      
      <OptionsModal />
    </ScrollView>
  );
};

export default DetailScreen;
