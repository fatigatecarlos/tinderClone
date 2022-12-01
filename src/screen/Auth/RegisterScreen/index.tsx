import React, {useState} from 'react';
import {ScrollView, Keyboard, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, StackActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Geolocation from '@react-native-community/geolocation';

import {RootState} from '../../../wrappers/Reducers';
import {registerUser} from '../../../wrappers/Reducers/Slices/UserSlice';

import style from '../style';
import Input from '../../../ui/Input';
import Loader from '../../../ui/Loader';
import Button from '../../../ui/Button';
import LogoImage from '../../../components/LogoImage';
import {RootStack} from '../../../utils/Types';

const RegisterScreen = () => {
  const dispatcher = useDispatch();
  const screenState = useSelector((state: RootState) => state);

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    coordinates: {lat: 0, long: 0},
  });
  const [errors, setErrors] = useState({name: '', email: '', password: ''});

  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();

  const handleOnchange = (text: string, input: string) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error: string, input: string) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const getCoordinates = () => {
    Geolocation.watchPosition(
      async position => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        setInputs(prevState => ({
          ...prevState,
          ['coordinates']: {lat: lat, long: long},
        }));
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    let valideEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (inputs.name === '') {
      handleError('Please input name', 'name');
      isValid = false;
    }

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

  const register = async () => {
    try {
      if (validate()) {
        getCoordinates();
        await dispatcher(registerUser(inputs));
        if (!screenState.user.error) {
          navigation.dispatch(StackActions.replace('HomeScreen'));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <Loader visible={screenState.user.loading} />
      <View style={style.container}>
        <LogoImage />
        <Input
          onChangeText={(text: string) => handleOnchange(text, 'name')}
          onFocus={() => handleError('', 'name')}
          iconName="account"
          label="Name"
          placeholder="Enter your full name"
          error={errors.name}
        />
        <Input
          onChangeText={(text: string) => handleOnchange(text, 'email')}
          onFocus={() => handleError('', 'email')}
          autoCapitalize="none"
          iconName="email-outline"
          label="Email"
          placeholder="Enter your email address"
          error={errors.email}
        />
        <Input
          onChangeText={(text: string) => handleOnchange(text, 'password')}
          onFocus={() => handleError('', 'password')}
          iconName="lock-outline"
          autoCapitalize="none"
          label="Password"
          placeholder="Enter your password"
          error={errors.password}
          password
        />
        <Button title="Register" onPress={register} />
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
