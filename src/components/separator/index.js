import { View } from "react-native"
import { colors } from "../../styles/colors";

export const Separator = ({ width = "100%" }) => (
  <View style={{ borderBottomColor: colors.gray[300], borderBottomWidth: 2, width }} />
);
