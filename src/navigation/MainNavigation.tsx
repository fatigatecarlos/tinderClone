import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from '../wrappers/Reducers';

import HomeScreen from '../screen/HomeScreen';
import AuthNavigation from './AuthNavigation';

const Stack = createNativeStackNavigator();
const authNavigation = AuthNavigation(Stack);

const MainNavigation = () => {
  const userState = useSelector((state: RootState) => state.user);
  let initialRouteName = 'ConfigurationScreen';
  if (userState.token === '') {
    initialRouteName = 'LoginScreen';
  }
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      {authNavigation}
    </Stack.Navigator>
  );
};

export default MainNavigation;
