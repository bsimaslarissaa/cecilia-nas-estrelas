import { Image } from 'expo-image';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <ImageBackground
  source={require('@/assets/images/fundocecilia.jpeg')}
  style={styles.background}
  resizeMode="cover"
>
  <SafeAreaView style={styles.containerContent}>

    {/* Logo */}
    <Image
      source={require('@/assets/images/logo-cecilia.png')}
      style={styles.logo}
      contentFit="contain"
    />

    {/* Subtítulo */}
    <Text style={styles.subtitulo}>
      Aprenda astronomia{"\n"}brincando ✨
    </Text>

    {/* Cecília */}
    <Image
      source={require('@/assets/images/ceciliainicio.png')}
      style={styles.cecilia}
      contentFit="contain"
    />

    {/* Botão */}
    <Pressable style={styles.botao}>
      <Text style={styles.textoBotao}>
        Entrar como convidado
      </Text>
    </Pressable>

    {/* Login */}
    <View style={styles.loginContainer}>
      <Text style={styles.loginTexto}>
        Já possui uma conta?
      </Text>

      <Text style={styles.loginLink}>
        Entrar
      </Text>
    </View>

  </SafeAreaView>
</ImageBackground>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  containerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },

 logo: {
  width: '120%',
  height: 280,
  marginTop: 20,
  marginBottom: -70,
},

 subtitulo: {
  color: '#FFFFFF',
  fontSize: 18,
  textAlign: 'center',
  marginTop: -30,
  marginBottom: -20,
  lineHeight: 26,
  fontWeight: '500',
},

  cecilia: {
  width: '90%',
  height: 320,
},

  botao: {
    width: '90%',
    backgroundColor: '#5C38D6',
    paddingVertical: 18,
    borderRadius: 35,
    alignItems: 'center',

    shadowColor: '#8A6CFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
  },

  loginContainer: {
    alignItems: 'center',
    marginTop: -10,
  },

  loginTexto: {
    color: '#FFFFFF',
    fontSize: 17,
  },

  loginLink: {
    color: '#B78DFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 6,
    textDecorationLine: 'underline',
  },

});