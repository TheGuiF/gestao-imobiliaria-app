import { View, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper"; //Biblioteca do Carrosel
import { colors } from "../../styles/colors";

export default function SwiperComponent() {
  return (
    <Swiper
      dotStyle={{
        backgroundColor: colors.gray[600],
        borderColor: colors.gray[600],
        borderWidth: 2, //Definição dos formatos
        width: 2,       //e cores das cores nos
        height: 2,      //nos modos ativo e desativado
        borderRadius: 10,
      }}
      activeDotColor={colors.gray[100]}
      activeDotStyle={{
        borderColor: colors.gray[600],
        borderWidth: 1,
        width: 12,
        height: 12,
        borderRadius: 10,
      }}
    >
      <View style={styles.slide}>
        <Image                        //Arrumar forma de pegar a imagem enviada
          source={require("../../assets/image1.png")} //  <---
          style={{ width: "100%", height: 250 }}
        />
      </View>

      <View style={styles.slide}>
        <Image
          source={require("../../assets/image2.jpg")} //  <---
          style={{ width: "100%", height: 250 }}
        />
      </View>

      <View style={styles.slide}>
        <Image
          source={require("../../assets/image3.jpg")} //  <---
          style={{ width: "100%", height: 250 }}
        />
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray[100],
  },
});
