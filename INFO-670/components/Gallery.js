import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const images = [
  { id: '1', title: 'New York City', src: require('../assets/nyc.png') },
  { id: '2', title: 'Mountain', src: require('../assets/image2.png') },
];

export default function Gallery() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ alignItems: 'center' }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Viewer', { image: item })}>
            <View style={styles.card}>
              <Image source={item.src} style={styles.image} />
              <Text style={styles.caption}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 16,
  },
  card: {
    alignItems: 'center',
    marginBottom: 24,
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 10,
  },
  caption: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
