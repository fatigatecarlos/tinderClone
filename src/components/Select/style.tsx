import {StyleSheet} from 'react-native';
import COLORS from '../../utils/Colors';

const style = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: COLORS.darkOrange,
  },
});

export default style;

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 4,
    color: COLORS.darkOrange,
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 5,
    paddingVertical: 4,
    color: COLORS.darkOrange,
  },
});
