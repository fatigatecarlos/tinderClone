import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainNavigation from './MainNavigation';
import ConfigNavigation from './ConfigNavigation';
import COLORS from '../utils/Colors';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  Icon.loadFont();
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Cards"
        component={MainNavigation}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="account-box-multiple" size={size} color={color} />
          ),
          tabBarActiveTintColor: COLORS.darkOrange,
        }}
      />
      <Tab.Screen
        name="Configuration"
        component={ConfigNavigation}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="cog-outline" size={size} color={color} />
          ),
          tabBarActiveTintColor: COLORS.darkOrange,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
