import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screen/HomeScreen';
import AuthNavigation from './AuthNavigation';

const Stack = createNativeStackNavigator();
const authNavigation = AuthNavigation(Stack);

const MainNavigation = () => (
  <Stack.Navigator>
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

export default MainNavigation;
