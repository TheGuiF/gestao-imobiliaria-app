import React, { useEffect } from "react";
import {
  Alert,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import styles from "./styles";
import RedButton from "../redButton";
import { useCardCreation } from "../../contexts/cardCreationContext";

export default function AddImages({ initialImages }) {
  const { formData, updateFormData } = useCardCreation();

  useEffect(() => {
    if (initialImages) {
      updateFormData({ imagens: initialImages });
    }
  }, [initialImages]);

  const pickImages = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão necessária", "Permita acesso à galeria.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        base64: false,
      });

      if (!result.canceled && result.assets) {
        const newImages = result.assets.map((asset) => asset.uri);
        updateFormData({
          imagens: [...(formData.imagens || []), ...newImages],
        });
      }
    } catch (error) {
      console.error('Erro ao selecionar imagens:', error);
      Alert.alert('Erro', 'Não foi possível selecionar as imagens.');
    }
  };

  const removeImage = (uri) => {
    const updatedImages = formData.imagens.filter((img) => img !== uri);
    updateFormData({ imagens: updatedImages });
  };

  return (
    <View style={styles.container}>
      <RedButton
        style={styles.pickerButtom}
        title="Adicionar Imagens"
        onPress={pickImages}
      />

      {formData.imagens && formData.imagens.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageScroll}
        >
          {formData.imagens.map((uri, index) => (
            <View
              key={index}
              style={styles.imageContainer}
            >
              <Image 
                source={{ uri }} 
                style={styles.image}
                defaultSource={require("../../assets/default.png")}
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => removeImage(uri)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
