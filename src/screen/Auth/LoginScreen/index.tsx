import React, {useState, useEffect} from 'react';
import {ScrollView, Keyboard, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, StackActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Input from '../../../ui/Input';
import Loader from '../../../ui/Loader';
import Button from '../../../ui/Button';
import style from '../style';
import {RootState} from '../../../wrappers/Reducers';
import {loginUser} from '../../../wrappers/Reducers/Slices/UserSlice';
import LogoImage from '../../../components/LogoImage';
import {RootStack} from '../../../utils/Types';

const LoginScreen = () => {
  const dispatcher = useDispatch();

  const screenState = useSelector((state: RootState) => state);
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();

  const [inputs, setInputs] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({email: '', password: ''});

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    let valideEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (inputs.email.match(valideEmail) === null) {
      handleError('Please input email', 'email');
      isValid = false;
    }
    if (inputs.password === '') {
      handleError('Please input password', 'password');
      isValid = false;
    }

    return isValid;
  };

  const login = async () => {
    try {
      if (validate()) {
        await dispatcher(loginUser(inputs));
        if (screenState.user.token) {
          navigation.dispatch(StackActions.replace('HomeScreen'));
        }
        console.log(screenState.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnchange = (text: string, input: string) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error: string, input: string) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  useEffect(() => {
    if (screenState.user.token) {
      navigation.dispatch(StackActions.replace('HomeScreen'));
    }
  }, [screenState.user.token, navigation]);

  return (
    <ScrollView>
      <Loader visible={screenState.user.loading} />
      <View style={style.container}>
        <LogoImage />
        {screenState.user.error && (
          <Text style={style.error}>
            The provided credentials are incorrect.
          </Text>
        )}
        <View style={style.inputCard}>
          <Input
            onChangeText={(text: string) => handleOnchange(text, 'email')}
            onFocus={() => handleError('', 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <Input
            onChangeText={(text: string) => handleOnchange(text, 'password')}
            onFocus={() => handleError('', 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Button title="Log In" onPress={login} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegisterScreen');
            }}>
            <Text style={style.text}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
