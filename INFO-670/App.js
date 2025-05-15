import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Gallery from './components/Gallery';
import PictureViewer from './components/PictureViewer';
import Profile from './components/Profile';
import { Provider as PaperProvider } from 'react-native-paper';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function GalleryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GalleryMain" component={Gallery} options={{ title: 'Gallery' }} />
      <Stack.Screen name="Viewer" component={PictureViewer} options={{ title: 'Picture Viewer' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Gallery') {
                iconName = 'image-album'; // gallery icon
              } else if (route.name === 'Profile') {
                iconName = 'account-circle'; // profile icon
              }

              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            },
            tabBarActiveTintColor: '#2196F3',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Gallery" component={GalleryStack} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
