import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParamList = {
  Home: object;
  Detail: { id: string; name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * AppNavigator is the main navigation component that sets up the stack navigator
 * for the application. It includes two screens: Home and Detail. The header for
 * each screen is hidden by default.
 *
 * - Home: Displays the main screen with a list of cryptocurrencies.
 * - Detail: Shows detailed information about a selected cryptocurrency.
 *
 * @returns {JSX.Element} A NavigationContainer with a stack navigator.
 */

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
