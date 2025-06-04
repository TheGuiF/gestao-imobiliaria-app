import { View, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { colors } from "../../styles/colors";

export default function SwiperComponent({ images = [] }) {
  const hasImages = images && images.length > 0;
  const defaultImage = require("../../assets/default.png");

  const renderImage = (source, index) => {
    const imageSource = typeof source === 'string' ? { uri: source } : source;
    
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
      {hasImages ? (
        images.map((source, index) => renderImage(source, index))
      ) : (
        renderImage(defaultImage, 0)
      )}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 250,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray[200],
  },
  image: {
    width: '100%',
    height: 250,
  },
  dot: {
    backgroundColor: colors.gray[600],
    borderColor: colors.gray[600],
    borderWidth: 2,
    width: 2,
    height: 2,
    borderRadius: 10,
  },
  activeDot: {
    borderColor: colors.gray[600],
    borderWidth: 1,
    width: 12,
    height: 12,
    borderRadius: 10,
  }
});
