import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
      <ImageBackground 
      source={require('@/assets/images/fundocecilia.jpeg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.containerContent}>
        <Text style={styles.texto}>Cecília nas estrelas </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, 
  },
  containerContent: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 80,
    alignItems: 'center',
   
  },
  texto: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});