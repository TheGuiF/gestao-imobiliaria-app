import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.gray[200],
    padding: 20,
  },
  content: {
    backgroundColor: colors.gray[100],
    borderRadius: 15,
    padding: 20,
    elevation: 4,
  },
});

export default styles; 