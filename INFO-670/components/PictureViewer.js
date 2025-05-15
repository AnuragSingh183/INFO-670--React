import React from 'react';
import { View, Image, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function PictureViewer({ route, navigation }) {
  const { image } = route.params || {};

  if (!image) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No Image Selected</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      <Image source={image.src} style={{ width: '100%', height: 300, borderRadius: 12 }} />
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 12 }}>{image.title}</Text>
      <Button
        mode="contained"
        style={{ marginTop: 20 }}
        onPress={() => navigation.goBack()}
      >
        Back to Gallery
      </Button>
    </View>
  );
}
