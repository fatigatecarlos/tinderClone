import React, {type PropsWithChildren, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {useNavigation, StackActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../wrappers/Reducers';
import Geolocation from '@react-native-community/geolocation';
import {getUsers} from '../../wrappers/Reducers/Slices/UserSlice';

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

type RootStack = {
  HomeScreen: undefined;
  LoginScreen: undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const userState = useSelector((state: RootState) => state.user);
  const dispatcher = useDispatch();

  const fetchUser = async () => {
    // try {
    //   await dispatcher(loginUser(inputs));
    //   if (!userState.user.error) {
    //     navigation.navigate('HomeScreen');
    //   }
    //   console.log(screenState.user);
    // } catch (error) {
    //   console.log(error);
    // }
    subscribeLocationLocation();
  };

  const subscribeLocationLocation = () => {
    Geolocation.watchPosition(
      async position => {
        const long = JSON.stringify(position.coords.longitude);
        const lat = JSON.stringify(position.coords.latitude);
        await dispatcher(getUsers({lat, long}));
        console.log(userState.users);
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
    console.log(userState.token);
    if (userState.token === '') {
      navigation.dispatch(StackActions.replace('LoginScreen'));
    }
    // if (userState.token === '') {
    //   navigation.navigate('LoginScreen');
    // }
    //fetchUser();
  });

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Header />
      {userState.loading && <Text>loading</Text>}
      {userState.error && <Text>error</Text>}
      {!userState.loading && !userState.error && <Text>default</Text>}
      <View>
        <Section title="Step One">
          Edit <Text style={styles.highlight}>App.tsx</Text> to change this
          screen and then come back to see your edits.
        </Section>
        <Section title="See Your Changes">
          <ReloadInstructions />
        </Section>
        <Section title="Debug">
          <DebugInstructions />
        </Section>
        <Section title="Learn More">
          Read the docs to discover what to do next:
        </Section>
        <LearnMoreLinks />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default HomeScreen;
