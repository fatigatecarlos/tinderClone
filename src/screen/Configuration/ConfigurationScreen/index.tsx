import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

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
import {saveConfigurations} from '../../../wrappers/Reducers/Slices/UserSlice';
import OptionSlider from '../../../components/OptionSlider';
import Select from '../../../components/Select';

const ConfigurationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const reduxStates = useSelector((state: RootState) => state);
  const dispatcher = useDispatch();

  const selectItems = [
    {label: 'Men', value: 'men'},
    {label: 'Woman', value: 'woman'},
    {label: 'Both', value: 'both'},
  ];

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

    try {
      let userConfig = {
        userId: reduxStates.user.user.userId,
        coordinates: coordinates,
        ageRange: ageRange,
        maxDistance: maxDistance,
        selectedGender: selectedGender,
      };
      await dispatcher(saveConfigurations(userConfig));
      if (!reduxStates.user.error) {
        await dispatcher(setPosition(coordinates));
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (reduxStates.user.token === '') {
      navigation.dispatch(StackActions.replace('LoginScreen'));
    }
  });

  return (
    <View style={style.container}>
      <Loader visible={reduxStates.user.loading} />
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
      <Button title="Save" onPress={saveConfig} />
    </View>
  );
};

export default ConfigurationScreen;
