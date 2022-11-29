import React from 'react';
import {useWindowDimensions, View, Text, ActivityIndicator} from 'react-native';
import COLORS from '../../utils/Colors';
import style from './styles';

const Loader = ({visible = false}) => {
  const {width, height} = useWindowDimensions();
  return visible ? (
    <View style={[style.container, {height, width}]}>
      <View style={style.loader}>
        <ActivityIndicator size="large" color={COLORS.orange} />
        <Text style={style.text}>Loading...</Text>
      </View>
    </View>
  ) : (
    <></>
  );
};

export default Loader;
