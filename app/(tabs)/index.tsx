import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Cecília nas estrelas ✨</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D3D47', // Cor escura do seu template antigo
  },
  texto: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
