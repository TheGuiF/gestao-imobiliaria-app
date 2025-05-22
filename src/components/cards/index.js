import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles.js";

export default function Cards(props) {
  function filterDesc(desc) {
    if (desc.length < 61) {
                   //Função para colocar '. . .' quando o texto
      return desc; //for muito grande e não couber no card
    }

    return `${desc.substring(0, 57)}...`;
  }
  return (
    <TouchableOpacity style={styles.container} onPress={props.onClick}>
      <Image                    //Criar funções da qual pega os dados colocados
        source={props.img}      //no "CardCreationScreen" e que com eles salvos
        style={styles.cardImg}  //de para criar os Cards e salvar os mesmos
      />
      <View style={{ maxWidth: "65%", rowGap: 20 }}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {filterDesc(props.children)}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.cardText, { opacity: 0.8 }, { width: "60%" }]}>
            {" "}
            {props.cost}{" "}
          </Text>
          <Text style={[styles.cardText, { width: "40%" }]}>
            {" "}
            {props.status}{" "}
          </Text>
        </View>
      </View>
    </TouchableOpacity> // {props.status}
  );
}
