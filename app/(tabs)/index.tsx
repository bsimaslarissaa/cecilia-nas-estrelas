import { Image } from 'expo-image';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
      <ImageBackground 
      source={require('@/assets/images/fundocecilia.jpeg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.containerContent}>
        <Text style={styles.texto}>Cecília nas estrelas </Text>

        <Image 
          source={require('@/assets/images/ceciliainicio.png')} 
          style={styles.cecilia} 
          />
          <Pressable style={styles.botao}>
          <Text style={styles.textoBotao}> Entrar como convidado</Text>
        </Pressable>
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
    paddingTop: 100,
    alignItems: 'center',
    gap: 90
   
  },
  texto: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'serif',
    
  },
  cecilia: {
    width: 300,  
    height: 300, 
    borderRadius: 50,
  },
   botao: {
    backgroundColor: '#1e1289',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 25, 
    marginTop: 10, 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  textoBotao: {
    color: '#f7f7f7',
    fontSize: 16,
    fontWeight: 'bold',
  },
});