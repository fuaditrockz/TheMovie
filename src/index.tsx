import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { TheMovieContextProvider } from './context';
import Home from './screens/Home';
import MovieDetails from './screens/MovieDetails'

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <TheMovieContextProvider>
        <StatusBar translucent backgroundColor='rgba(39, 38, 43, 0.9)' />
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="MovieDetails" component={MovieDetails} />
        </Stack.Navigator>
      </TheMovieContextProvider>
    </NavigationContainer>
  );
};

export default App;
