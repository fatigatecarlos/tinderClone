import React from 'react';
import {Text, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import style, {pickerSelectStyles} from './style';
import {Select as SelectType} from '../../utils/Types';

const Select = ({title, inicialValue, items, setSelectedValue}: SelectType) => {
  return (
    <View style={style.container}>
      <Text style={style.label}>{title} </Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={value => setSelectedValue(value)}
        value={inicialValue}
        items={items}
      />
    </View>
  );
};

export default Select;
