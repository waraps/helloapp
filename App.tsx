import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, List, Libraries} from './src/screens';

export type StackNavigatorParamList = {
  Home: undefined;
  List: undefined;
  Libraries: undefined;
};

const Stack = createNativeStackNavigator<StackNavigatorParamList>();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Libraries" component={Libraries} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
