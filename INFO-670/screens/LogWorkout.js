import React, { useState } from 'react';
import { View, TextInput, Button, KeyboardAvoidingView, StyleSheet, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';

export default function LogWorkoutScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const logWorkout = async () => {
    if (!user || !type || !duration) {
      setSnackbarMessage('Please fill out all fields!');
      setSnackbarVisible(true);
      return;
    }

    try {
      const payload = { user, type, duration, notes };
      const res = await fetch('http://192.168.1.172:3001/api/logWorkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setSnackbarMessage(data.msg || "Workout logged");
      setSnackbarVisible(true);

 
      setUser('');
      setType('');
      setDuration('');
      setNotes('');
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Failed to log workout");
      setSnackbarVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.title}>Log Your Workout</Text>
      <TextInput style={styles.input} placeholder="Username" value={user} onChangeText={setUser} />
      <TextInput style={styles.input} placeholder="Workout Type (e.g., Chest)" value={type} onChangeText={setType} />
      <TextInput style={styles.input} placeholder="Duration (mins)" value={duration} onChangeText={setDuration} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Notes (optional)" value={notes} onChangeText={setNotes} multiline />
      <Button title="Log Workout" onPress={logWorkout} />
      <Button title="View Workouts" onPress={() => navigation.navigate('View')} />
      <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={3000}>
        {snackbarMessage}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 8 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }
});
