import { View, Text, ScrollView } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import SwiperComponent from "../../components/swiper";
import { colors } from "../../styles/colors";
import styles from "./styles";

const DetailScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.swiperContent}>
        <SwiperComponent />
      </View>
      <View style={{margin: "6%"}}>
        <View>
          <Text style={styles.subTitle}>Venda</Text>
        </View>
        <View>
          <Text style={styles.title}>R$650.000,00</Text>
        </View>
        <View style={{ gap: 10, marginTop: "6%" }}>
          <View style={styles.icons}>
            <FontAwesome name="bed" size={24} color={colors.gray[600]} />
            <Text style={[styles.iconText, { width: "28%" }]}>
              Dormitórios:
            </Text>
            <Text style={styles.iconResult}>3</Text>
          </View>

          <View style={styles.icons}>
            <FontAwesome name="car" size={24} color={colors.gray[600]} />
            <Text style={[styles.iconText, { width: "23%" }]}>Garagens:</Text>
            <Text style={styles.iconResult}>1</Text>
          </View>

          <View style={styles.icons}>
            <MaterialIcons name="square-foot" size={26} color={colors.gray[600]} />
            <Text style={[styles.iconText, { width: "38%" }]}>
              Área Construida:
            </Text>
            <Text style={styles.iconResult}>180m²</Text>
          </View>

          <View style={styles.icons}>
            <FontAwesome name="check-circle" size={28} color={colors.gray[600]} />
            <Text style={[styles.iconText, { width: "22%" }]}>Situação:</Text>
            <Text style={styles.iconResult}>Pronto para morar</Text>
          </View>
        </View>
      </View>

      <View style={{ borderBottomColor: colors.gray[300], borderBottomWidth: 2 }} />

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
        <View
          style={{
            borderBottomColor: colors.gray[300],
            borderBottomWidth: 2,
            width: "80%",
          }}
        />

        <View style={{ flexDirection: "row", gap: "40%", }}>
          <Text style={{fontWeight: 600 }}>IPTU Anual</Text>
          <Text style={{ color: colors.red[100], fontWeight: 600 }}>R$300,00</Text>
        </View>

        <View
          style={{
            borderBottomColor: colors.gray[300],
            borderBottomWidth: 2,
            width: "80%",
          }}
        />
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
