import React, { useState } from "react";
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

export default function AddImages() {
  const [images, setImages] = useState([]);

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
        id: asset.assetId || asset.uri, // fallback
      }));

      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <View style={styles.container}>
      <RedButton
        style={styles.pickerButtom}
        title="Adicionar Imagens"
        onPress={pickImages}
      />

      {images.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 20, paddingTop: 10 }}
        >
          {images.map((img) => (
            <View
              key={img.id}
              style={{ marginRight: 10, position: "relative" }}
            >
              <Image
                source={{ uri: img.uri }}
                style={styles.image}
              />
              <TouchableOpacity
                onPress={() => removeImage(img.id)}   //Botão pra remover as imagens
                style={styles.removeButton}           //selecionadas
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
