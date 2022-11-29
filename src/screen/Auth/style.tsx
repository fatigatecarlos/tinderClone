import {StyleSheet} from 'react-native';
import COLORS from '../../utils/Colors';

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputCard: {marginVertical: 20},
  error: {marginTop: 7, marginBottom: 10, color: COLORS.red, fontSize: 20},
  text: {fontSize: 16, color: COLORS.grey},
});

export default style;
