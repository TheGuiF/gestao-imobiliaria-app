import { TextInput, View, Text } from 'react-native';
import styles from './style';

const InputField = ({ label, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder=" . . ."
        style={styles.input}
        placeholderTextColor="#999"
      />
    </View>
  );
};

export default InputField;

