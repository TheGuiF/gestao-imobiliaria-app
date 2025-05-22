import { View, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { colors } from "../../styles/colors";

export default function SwiperComponent({ images = [] }) {
  const hasImages = images && images.length > 0;

  return (
    <Swiper
      dotStyle={{
        backgroundColor: colors.gray[600],
        borderColor: colors.gray[600],
        borderWidth: 2,
        width: 2,
        height: 2,
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
      {hasImages ? (
        images.map((uri, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri }} style={{ width: "100%", height: 250 }} />
          </View>
        ))
      ) : (
        <View style={styles.slide}>
          <Image
            source={require("../../assets/default.png")}
            style={{ width: "100%", height: 250 }}
          />
        </View>
      )}
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
