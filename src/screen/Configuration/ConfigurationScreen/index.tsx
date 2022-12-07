import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../wrappers/Reducers';
import {useNavigation, StackActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import style from './style';
import Loader from '../../../ui/Loader';
import Button from '../../../ui/Button';
import {RootStack} from '../../../utils/Types';
import {setPosition} from '../../../wrappers/Reducers/Slices/GeolocationSlice';
import {
  saveConfigurations,
  getProfile,
} from '../../../wrappers/Reducers/Slices/UserSlice';
import OptionSlider from '../../../components/OptionSlider';
import Select from '../../../components/Select';
import Input from '../../../ui/Input';

const ConfigurationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const reduxStates = useSelector((state: RootState) => state);
  const dispatcher = useDispatch();

  const selectItems = [
    {label: 'Men', value: 'men'},
    {label: 'Woman', value: 'woman'},
    {label: 'Both', value: 'both'},
  ];

  const [description, setDescription] = useState(
    reduxStates.user.user.description,
  );

  const [coordinates, setCoordinates] = useState({
    lat: reduxStates.geolocation.position.lat,
    long: reduxStates.geolocation.position.long,
  });

  const [ageRange, setAgeRange] = useState({
    min: reduxStates.user.user.ageRange.min,
    max: reduxStates.user.user.ageRange.max,
  });

  const [maxDistance, setMaxDistance] = useState(
    reduxStates.user.user.maxDistance,
  );

  const [selectedGender, setSelectedGender] = useState(
    reduxStates.user.user.selectedGender,
  );

  const handleAgeRangeChange = (values: Array<number>) => {
    let range = {
      min: values[0],
      max: values[1],
    };
    setAgeRange(range);
  };

  const handleDistanceChange = (values: Array<number>) => {
    setMaxDistance(values[0]);
  };

  const handleSeletedGenderChange = (value: string) => {
    setSelectedGender(value);
  };

  const saveConfig = async () => {
    try {
      let userConfig = {
        userId: reduxStates.user.user.userId,
        coordinates: coordinates,
        description: description,
        ageRange: ageRange,
        maxDistance: maxDistance,
        selectedGender: selectedGender,
      };
      dispatcher(saveConfigurations(userConfig));
      if (!reduxStates.user.error) {
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCoordinates = async () => {
    await Geolocation.watchPosition(
      async position => {
        setCoordinates({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
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

  useEffect(() => {
    if (reduxStates.user.token === '') {
      navigation.dispatch(StackActions.replace('LoginScreen'));
    }

    try {
      getCoordinates();
      dispatcher(getProfile(reduxStates.user.token));
      console.log('reduxStates.user.user');
      console.log(reduxStates.user.user);
    } catch (error) {
      navigation.dispatch(StackActions.replace('LoginScreen'));
    }
  }, [dispatcher, navigation, reduxStates.user.token]);

  return (
    <View style={style.container}>
      <Loader visible={reduxStates.user.loading} />
      <View>
        <Text>{reduxStates.user.user.name}</Text>
      </View>
      <Input
        onChangeText={(text: string) => setDescription(text)}
        multiline
        numberOfLines={6}
        maxLength={200}
        value={description}
        label="Description"
        placeholder="Enter your description"
      />
      <OptionSlider
        title={'Age range'}
        inicialValues={[ageRange.min, ageRange.max]}
        label={`${ageRange.min}-${ageRange.max}`}
        multiSliderValuesChange={handleAgeRangeChange}
      />

      <OptionSlider
        title={'Maximun Distance'}
        inicialValues={[maxDistance]}
        label={`${maxDistance} km`}
        multiSliderValuesChange={handleDistanceChange}
      />
      <Select
        title={'Show me'}
        inicialValue={selectedGender}
        items={selectItems}
        setSelectedValue={handleSeletedGenderChange}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProfileImagesScreen');
        }}>
        <Text>Profile images</Text>
      </TouchableOpacity>
      <Button title="Save" onPress={saveConfig} />
    </View>
  );
};

export default ConfigurationScreen;
