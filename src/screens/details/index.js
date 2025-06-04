import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

import { Separator } from "../../components/separator";
import SwiperComponent from "../../components/swiper";
import InfoItem from "../../components/infoItem";
import DeleteButton from "../../components/deleteButton";
import { colors } from "../../styles/colors";
import { useCardCreation } from "../../contexts/cardCreationContext";
import styles from "./styles";

const DetailScreen = ({ navigation }) => {
  const route = useRoute();
  const initialImovel = route?.params?.imovel;

  const { deletarImovel, buscarImovelPorId } = useCardCreation();
  const [imovel, setImovel] = useState(initialImovel);
  const [modalVisible, setModalVisible] = useState(false);

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.swiperContent}>
        <SwiperComponent
          images={imovel.imagens?.length > 0 ? imovel.imagens : [defaultImage]}
        />
      </View>

      <View style={{ margin: "6%" }}>
        <Text style={styles.subTitle}>{imovel.tipoImovel}</Text>
        <Text style={styles.title}>R$ {formatCurrency(imovel.valorVenda)}</Text>

        <View style={{ gap: 10, marginTop: "6%" }}>
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

      <View>
        <Text style={[styles.title, styles.taxTitle]}>Taxas</Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <Separator width="80%" />
        <View style={styles.taxRow}>
          <Text style={styles.taxLabel}>IPTU Anual</Text>
          <Text style={styles.taxValue}>R$ {formatCurrency(imovel.iptu)}</Text>
        </View>
        <Separator width="80%" />
      </View>

      {/* Modal de confirmação */}
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

