import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Button as ButtonType} from '../../utils/Types';
import style from './style';

const Button = ({title, onPress = () => {}}: ButtonType) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={style.container}>
      <Text style={style.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
