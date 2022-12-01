import {StyleSheet} from 'react-native';
import COLORS from '../../utils/Colors';

const style = StyleSheet.create({
  rangeContiner: {
    marginVertical: 10,
  },
  rangeContinerLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rangeLabel: {
    color: COLORS.darkOrange,
  },
});

export default style;
