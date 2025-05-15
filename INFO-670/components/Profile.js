import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button, Switch, Text } from 'react-native-paper';

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await AsyncStorage.getItem('profile');
      if (data) {
        const profile = JSON.parse(data);
        setName(profile.name);
        setEmail(profile.email);
        setNotifications(profile.notifications);
      }
    };
    loadProfile();
  }, []);

  const saveProfile = async () => {
    if (!name || !email) {
      Alert.alert('Validation', 'Name and email are required.');
      return;
    }
    await AsyncStorage.setItem('profile', JSON.stringify({ name, email, notifications }));
    Alert.alert('Saved', 'Profile saved successfully.');
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput label="Name" value={name} onChangeText={setName} />
      <TextInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <Text>Enable Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>
      <Button mode="contained" onPress={saveProfile} style={{ marginTop: 20 }}>
        Save
      </Button>
    </View>
  );
}
                                                                                    