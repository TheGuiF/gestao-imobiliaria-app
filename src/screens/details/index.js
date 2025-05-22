// import { View, Text, ScrollView, TouchableOpacity } from "react-native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import Feather from "@expo/vector-icons/Feather";

// import { Separator } from "../../components/separator";
// import SwiperComponent from "../../components/swiper";
// import DeleteButton from "../../components/deleteButton";
// import InfoItem from "../../components/infoItem";
// import { colors } from "../../styles/colors";
// import styles from "./styles";

// const DetailScreen = ({ route }) => {
//   const { imovel } = route.params;

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <View style={{ flexDirection: "row", gap: 16, marginRight: 10 }}>
//           <TouchableOpacity onPress={() => navigation.navigate("EditImages")}>
//             <Feather name="edit" size={22} color="black" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => console.log("Compartilhar")}>
//             <MaterialIcons name="share" size={24} color="black" />
//           </TouchableOpacity>
//           <DeleteButton
//             imovelId={imovel.id}
//             onSuccess={() => navigation.goBack()}
//           />
//         </View>
//       ),
//     });
//   }, [navigation]);
//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.swiperContent}>
//         <SwiperComponent images={imovel.imagens} />
//       </View>

//       <View style={{ margin: "6%" }}>
//         <Text style={styles.subTitle}>{imovel.tipoImovel}</Text>
//         <Text style={styles.title}>R${imovel.valorVenda}</Text>

//         <View style={{ gap: 10, marginTop: "6%" }}>
//           <InfoItem
//             icon={<FontAwesome name="bed" size={24} color={colors.gray[600]} />}
//             label="Dormitórios:"
//             value={imovel.dormitorios}
//           />
//           <InfoItem
//             icon={<FontAwesome name="car" size={24} color={colors.gray[600]} />}
//             label="Garagens:"
//             value={imovel.garagens}
//           />
//           <InfoItem
//             icon={
//               <MaterialIcons
//                 name="square-foot"
//                 size={26}
//                 color={colors.gray[600]}
//               />
//             }
//             label="Área Construída:"
//             value={`${imovel.area}m²`}
//           />
//           <InfoItem
//             icon={
//               <FontAwesome
//                 name="check-circle"
//                 size={28}
//                 color={colors.gray[600]}
//               />
//             }
//             label="Situação:"
//             value={imovel.situacao}
//           />
//         </View>
//       </View>

//       <Separator />

//       <View>
//         <Text
//           style={[
//             styles.title,
//             { color: colors.gray[600] },
//             { textAlign: "center" },
//             { marginVertical: "2%" },
//           ]}
//         >
//           Taxas
//         </Text>
//       </View>

//       <View style={{ alignItems: "center" }}>
//         <Separator width="80%" />
//         <View style={{ flexDirection: "row", gap: "40%" }}>
//           <Text style={{ fontWeight: "600" }}>IPTU Anual</Text>
//           <Text style={{ color: colors.red[100], fontWeight: "600" }}>
//             R${imovel.iptu}
//           </Text>
//         </View>
//         <Separator width="80%" />
//       </View>
//     </ScrollView>
//   );
// };

// export default DetailScreen;

import { useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

import { Separator } from "../../components/separator";
import DocumentosSection from "../../components/documentSection";
import SwiperComponent from "../../components/swiper";
import InfoItem from "../../components/infoItem";
import { colors } from "../../styles/colors";
import { deletarImovel } from "../../services/cardService"; // Só será útil com backend

const DetailScreen = ({ route, navigation }) => {
  const { imovel } = route.params;

  // Botões de header (edit, share, delete)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", gap: 16 }}>
          <TouchableOpacity
            onPress={() => console.log("Editar ainda não disponível")}
          >
            <Feather name="edit" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Simulação",
                "Função de deletar só funciona com backend."
              );
            }}
          >
            <Feather name="trash-2" size={22} color="red" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    
    <ScrollView style={styles.container}>
      
      <View style={styles.swiperContent}>
        <SwiperComponent
          images={
            imovel.imagens.length > 0
              ? imovel.imagens
              : ["https://via.placeholder.com/300"]
          }
        />
      </View>

      <View style={{ margin: "6%" }}>
        <Text style={styles.subTitle}>{imovel.tipoImovel}</Text>
        <Text style={styles.title}>R$ {imovel.valorVenda}</Text>

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
            {
              color: colors.gray[600],
              textAlign: "center",
              marginVertical: "2%",
            },
          ]}
        >
          Taxas
        </Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <Separator width="80%" />
        <View style={{ flexDirection: "row", gap: "40%" }}>
          <Text style={{ fontWeight: "600" }}>IPTU Anual</Text>
          <Text style={{ color: colors.red[200], fontWeight: "600" }}>
            R$ {imovel.iptu}
          </Text>
        </View>
        <Separator width="80%" />
      </View>
      <View style={{marginTop: "10%"}}>
        <Separator />
      </View>

      <DocumentosSection imovelId={imovel.id} />
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  swiperContent: {
    width: "100%",
    height: 250,
    backgroundColor: colors.gray[300],
  },
  title: {
    fontSize: 28,
    fontWeight: 600,
    color: colors.red[200]
  },
  subTitle: {
    fontSize: 18,
    color: colors.gray[600],
    marginBottom: 6,
  },
});
