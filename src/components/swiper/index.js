//bolinhas de carrossel no details
import { View, Image } from "react-native";
import Swiper from "react-native-swiper";
import { colors } from "../../styles/colors";
import styles from "./styles";

export default function SwiperComponent({ images = [] }) {
  const hasImages = images && images.length > 0;
  const defaultImage = require("../../assets/default.png");

  const renderImage = (source, index) => {
    const imageSource = typeof source === "string" ? { uri: source } : source;
    const isDefaultImage = !hasImages || source === defaultImage;

    return (
      <View key={index} style={styles.slide}>
        <Image
          source={imageSource}
          style={styles.image}
          defaultSource={defaultImage}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <Swiper
      style={styles.wrapper}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      activeDotColor={colors.gray[100]}
    >
      {hasImages
        ? images.map((source, index) => renderImage(source, index))
        : renderImage(defaultImage, 0)}
    </Swiper>
  );
}