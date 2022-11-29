import {StyleSheet} from 'react-native';
import COLORS from '../../utils/Colors';

const style = StyleSheet.create({
  container: {
    height: 55,
    width: '100%',
    backgroundColor: COLORS.orange,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {color: COLORS.white, fontWeight: 'bold', fontSize: 18},
});

export default style;
