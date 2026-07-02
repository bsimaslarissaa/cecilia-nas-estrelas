import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

  const irParawelcome = () => {
    router.push('/welcome' as any);
  };

  return (
    <ImageBackground
      source={require('@/assets/images/fundocecilia.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          alwaysBounceVertical={false}
        >

          <View style={styles.topoContainer}>
            <Image
              source={require('@/assets/images/logo-cecilia.png')}
              style={styles.logo}
              contentFit="contain"
            />

            <Text style={styles.subtitulo}>
              Aprenda astronomia{"\n"}brincando ✨
            </Text>
          </View>

          <Image
            source={require('@/assets/images/ceciliainicio.png')}
            style={styles.cecilia}
            contentFit="contain"
          />

          <View style={styles.baseContainer}>
            <Pressable
              style={styles.botao}
              onPress={irParawelcome}
            >
              <Text style={styles.textoBotao}>
                Entrar como convidado
              </Text>
            </Pressable>

            <View style={styles.loginContainer}>
              <Text style={styles.loginTexto}>
                Já possui uma conta?
              </Text>

              <Text style={styles.loginLink}>
                Entrar
              </Text>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  topoContainer: {
    alignItems: 'center',
    width: '100%',
  },

  logo: {
    width: '90%',
    height: 180,
  },

  subtitulo: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
    marginTop: -15,
  },

  cecilia: {
    width: '80%',
    height: 260,
    marginVertical: 20,
  },

  baseContainer: {
    alignItems: 'center',
    width: '100%',
    gap: 15,
  },

  botao: {
    width: '85%',
    backgroundColor: '#5C38D6',
    paddingVertical: 16,
    borderRadius: 30,
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
    fontSize: 18,
    fontWeight: 'bold',
  },

  loginContainer: {
    alignItems: 'center',
  },

  loginTexto: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  loginLink: {
    color: '#B78DFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
    textDecorationLine: 'underline',
  },
});