import { View, Text, ScrollView } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Separator } from "../../components/separator";
import SwiperComponent from "../../components/swiper";
import InfoItem from "../../components/infoItem";
import { colors } from "../../styles/colors";
import styles from "./styles";

const DetailScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.swiperContent}>
        <SwiperComponent />
      </View>
      <View style={{ margin: "6%" }}>
        <View>
          <Text style={styles.subTitle}>Venda</Text>
        </View>
        <View>
          <Text style={styles.title}>R$650.000,00</Text>
        </View>
        <View style={{ gap: 10, marginTop: "6%" }}>
          <InfoItem
            icon={<FontAwesome name="bed" size={24} color={colors.gray[600]} />}
            label="Dormitórios:"
            value="3"
          />
          <InfoItem
            icon={<FontAwesome name="car" size={24} color={colors.gray[600]} />}
            label="Garagens:"
            value="1"
          />
          <InfoItem
            icon={
              <MaterialIcons name="square-foot" size={26} color={colors.gray[600]}/>}
            label="Área Construida:"
            value="180m²"
          />
          <InfoItem
            icon={
              <FontAwesome name="check-circle" size={28} color={colors.gray[600]}/>
            }
            label="Situação:"
            value="Pronto para morar"
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
          <Text style={{ fontWeight: 600 }}>IPTU Anual</Text>
          <Text style={{ color: colors.red[100], fontWeight: 600 }}>
            R$300,00
          </Text>
        </View>
        <Separator width="80%" />
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
