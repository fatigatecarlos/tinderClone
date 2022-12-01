import React from 'react';
import LoginScreen from '../screen/Auth/LoginScreen';
import RegisterScreen from '../screen/Auth/RegisterScreen';

const headerOptions = {
  title: '',
};

const AuthNavigation = (Stack: any) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={headerOptions}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={headerOptions}
      />
    </Stack.Group>
  );
};

export default AuthNavigation;
