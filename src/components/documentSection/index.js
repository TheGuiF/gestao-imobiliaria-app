import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import RedButton from "../redButton";
import { v4 as uuidv4 } from "uuid";

export default function DocumentosSection({ imovelId }) {
  // Estado armazenando documentos por imóvel
  const [documentosPorImovel, setDocumentosPorImovel] = useState({});

  const documentos = documentosPorImovel[imovelId] || [];

  const adicionarDocumento = (novoDoc) => {
    setDocumentosPorImovel((prev) => {
      const atual = prev[imovelId] || [];
      return {
        ...prev,
        [imovelId]: [...atual, novoDoc],
      };
    });
  };

  const adicionarImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Habilite acesso à galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const doc = {
        id: uuidv4(),
        uri: result.assets[0].uri,
        tipo: "Imagem",
        nome: "Imagem",
      };
      adicionarDocumento(doc);
    }
  };

  const adicionarPDF = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (result.type === "success") {
      const doc = {
        id: uuidv4(),
        uri: result.uri,
        tipo: "PDF",
        nome: result.name,
      };
      adicionarDocumento(doc);
    }
  };

  const removerDocumento = (id) => {
    Alert.alert("Confirmar", "Remover este documento?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => {
          setDocumentosPorImovel((prev) => {
            const atual = prev[imovelId] || [];
            return {
              ...prev,
              [imovelId]: atual.filter((d) => d.id !== id),
            };
          });
        },
      },
    ]);
  };

  const abrirDocumento = (uri) => {
    Linking.openURL(uri);
  };

  return (
    <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Documentos do Imóvel
      </Text>

      {documentos.length === 0 ? (
        <Text style={{ fontStyle: "italic", marginBottom: 20 }}>
          Nenhum documento adicionado.
        </Text>
      ) : (
        <ScrollView horizontal>
          {documentos.map((doc) => (
            <TouchableOpacity
              key={doc.id}
              onPress={() => abrirDocumento(doc.uri)}
              style={{
                marginRight: 12,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 5,
              }}
            >
              {doc.tipo === "Imagem" ? (
                <Image
                  source={{ uri: doc.uri }}
                  style={{ width: 100, height: 100, borderRadius: 6 }}
                />
              ) : (
                <View
                  style={{
                    width: 100,
                    height: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f2f2f2",
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ fontSize: 12, textAlign: "center" }}>
                    📄 {doc.nome}
                  </Text>
                </View>
              )}

              <Text style={{ fontSize: 12, marginTop: 5 }}>{doc.tipo}</Text>

              <TouchableOpacity onPress={() => removerDocumento(doc.id)}>
                <Text style={{ color: "red", fontSize: 12 }}>Remover</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <RedButton
        title="Adicionar Imagem"
        onPress={adicionarImagem}
        style={{ marginTop: 15 }}
      />

      <RedButton
        title="Adicionar PDF"
        onPress={adicionarPDF}
        style={{ marginTop: 10 }}
      />
    </View>
  );
}
