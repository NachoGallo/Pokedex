import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import {StackNavigation} from './src/navigation/StackNavigation';

const App = () => {
  return (
    <AppState>
      <StackNavigation />
    </AppState>
  );
};

const AppState = ({children}: any) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};
export default App;
