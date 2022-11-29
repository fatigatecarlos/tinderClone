import {StyleSheet} from 'react-native';
import COLORS from '../../utils/Colors';

const style = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: 'center',
  },
  icon: {
    color: COLORS.darkOrange,
    fontSize: 22,
    marginRight: 10,
  },
  input: {color: COLORS.darkOrange, flex: 1},
  error: {marginTop: 7, color: COLORS.red, fontSize: 12},
});

export default style;
