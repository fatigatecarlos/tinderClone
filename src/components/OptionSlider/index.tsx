import React from 'react';
import {Text, View} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import style from './style';
import {OptionSlider as OptionSliderType} from '../../utils/Types';

const OptionSlider = ({
  title,
  inicialValues,
  label,
  multiSliderValuesChange,
}: OptionSliderType) => {
  return (
    <View style={style.rangeContiner}>
      <Text style={style.rangeLabel}>{title}</Text>
      <View style={style.rangeContinerLabel}>
        <MultiSlider
          values={inicialValues}
          sliderLength={280}
          onValuesChange={values => {
            multiSliderValuesChange(values);
          }}
          min={18}
          max={90}
          step={1}
        />
        <Text style={style.rangeLabel}>{label}</Text>
      </View>
    </View>
  );
};

export default OptionSlider;
