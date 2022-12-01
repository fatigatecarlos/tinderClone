import React from 'react';
import {View, Text, TextInput} from 'react-native';
import COLORS from '../../utils/Colors';

import style from './styles';
import {Input as InputType} from '../../utils/Types';

const Input = ({
  label,
  iconName,
  autoCapitalize,
  error,
  password,
  onFocus = () => {},
  ...props
}: InputType) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={style.container}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.darkOrange
              : COLORS.light,
          },
        ]}>
        <TextInput
          autoCorrect={false}
          autoCapitalize={autoCapitalize ?? 'sentences'}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={style.input}
          {...props}
        />
      </View>
      {error && <Text style={style.error}>{error}</Text>}
    </View>
  );
};

export default Input;
