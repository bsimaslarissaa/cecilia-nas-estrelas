import { ImageBackground } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function UniversoScreen() {
  return (
    <ImageBackground source={require('@/assets/images/bguniverse.jpeg')}
      style={styles.background}
      resizeMode="cover">
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
