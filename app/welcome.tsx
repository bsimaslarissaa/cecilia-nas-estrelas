import { ImageBackground } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function UniversoScreen() {
  return (
    <ImageBackground
      source={require('@/assets/images/bguniverse.jpeg')}
      style={styles.background}
      contentFit="cover"
    >
      <View style={styles.container}>
        <Text style={styles.texto}>Boas vindas!!</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  texto: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});