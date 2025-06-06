
import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';

export default function ViewWorkoutsScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const getWorkouts = async () => {
    if (!user) {
      setSnackbarMessage("Please enter a username");
      setSnackbarVisible(true);
      return;
    }

    try {
      const res = await fetch(`http://192.168.1.172:3001/api/getWorkouts?user=${user}`);
      const data = await res.json();
      if (data.workouts.length === 0) {
        setSnackbarMessage("No workouts found for this user");
        setSnackbarVisible(true);
      }
      setWorkouts(data.workouts);
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Failed to fetch workouts");
      setSnackbarVisible(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>View Workouts</Text>
      <TextInput style={styles.input} placeholder="Username" value={user} onChangeText={setUser} />
      <Button title="Get Workouts" onPress={getWorkouts} />
      <Button title="Back to Log" onPress={() => navigation.navigate('Log')} />
      {workouts.map((w, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.text}>{w.type} - {w.duration} mins</Text>
          <Text style={styles.text}>{w.notes}</Text>
          <Text style={styles.timestamp}>{new Date(w.createdAt).toLocaleString()}</Text>
        </View>
      ))}
      <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={3000}>
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 8 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  card: { marginVertical: 10, padding: 15, backgroundColor: '#f1f1f1', borderRadius: 10 },
  text: { fontSize: 16 },
  timestamp: { fontSize: 12, color: '#777', marginTop: 5 }
});
