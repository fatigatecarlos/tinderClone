import React from 'react';
import {Image} from 'react-native';
import style from './style';

const LogoImage = () => {
  return (
    <Image style={style.image} source={require('../../ui/assets/logo.png')} />
  );
};

export default LogoImage;
