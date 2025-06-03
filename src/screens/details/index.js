import { useLayoutEffect, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

import { Separator } from "../../components/separator";
import SwiperComponent from "../../components/swiper";
import InfoItem from "../../components/infoItem";
import { colors } from "../../styles/colors";
import { useCardCreation } from "../../contexts/cardCreationContext";

const DetailScreen = ({ route, navigation }) => {
  const { imovel: initialImovel } = route.params;
  const { deletarImovel, buscarImovelPorId } = useCardCreation();
  const [imovel, setImovel] = useState(initialImovel);

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
        <Text
          style={[
            styles.title,
            { color: colors.gray[600] },
            { textAlign: "center" },
            { marginVertical: "2%" },
          ]}
        >
          Taxas
        </Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <Separator width="80%" />
        <View style={{ flexDirection: "row", gap: "40%" }}>
          <Text style={{ fontWeight: "600" }}>IPTU Anual</Text>
          <Text style={{ color: colors.red[100], fontWeight: "600" }}>
            R$ {formatCurrency(imovel.iptu)}
          </Text>
        </View>
        <Separator width="80%" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[200],
  },
  swiperContent: {
    height: 340,
    backgroundColor: colors.gray[100],
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray[600],
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default DetailScreen;
