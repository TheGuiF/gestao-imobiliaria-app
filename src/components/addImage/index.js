import React from "react";
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

export default function AddImages() {
  const { formData, updateFormData } = useCardCreation();

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Permita acesso à galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => ({
        uri: asset.uri,
        id: asset.assetId || asset.uri,
      }));

      // Atualiza no contexto
      updateFormData({
        imagens: [...formData.imagens, ...newImages],
      });
    }
  };

  const removeImage = (id) => {
    const updatedImages = formData.imagens.filter((img) => img.id !== id);
    updateFormData({ imagens: updatedImages });
  };

  return (
    <View style={styles.container}>
      <RedButton
        style={styles.pickerButtom}
        title="Adicionar Imagens"
        onPress={pickImages}
      />

      {formData.imagens.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 20, paddingTop: 10 }}
        >
          {formData.imagens.map((img) => (
            <View
              key={img.id}
              style={{ marginRight: 10, position: "relative" }}
            >
              <Image source={{ uri: img.uri }} style={styles.image} />
              <TouchableOpacity
                onPress={() => removeImage(img.id)}
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
