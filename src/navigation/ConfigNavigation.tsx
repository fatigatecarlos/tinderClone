import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from '../wrappers/Reducers';

import ConfigurationScreen from '../screen/Configuration/ConfigurationScreen';
import AuthNavigation from './AuthNavigation';
import ProfileImagesScreen from '../screen/Configuration/ProfileImagesScreen';

const Stack = createNativeStackNavigator();
const authNavigation = AuthNavigation(Stack);

const ConfigNavigation = () => {
  const userState = useSelector((state: RootState) => state.user);
  let initialRouteName = 'ConfigurationScreen';
  if (userState.token === '') {
    initialRouteName = 'LoginScreen';
  }

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="ConfigurationScreen"
        component={ConfigurationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileImagesScreen"
        component={ProfileImagesScreen}
        options={{
          headerShown: false,
        }}
      />
      {authNavigation}
    </Stack.Navigator>
  );
};

export default ConfigNavigation;
