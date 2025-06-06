import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogWorkoutScreen from './screens/LogWorkout';
import ViewWorkoutsScreen from './screens/viewWorkout';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Log">
          <Stack.Screen name="Log" component={LogWorkoutScreen} />
          <Stack.Screen name="View" component={ViewWorkoutsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
