import { Image } from 'expo-image';
import React from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();

  const logoHeight = height * 0.23;
  const ceciliaSize = Math.min(width * 0.85, height * 0.36);

  return (
    <ImageBackground
      source={require('@/assets/images/fundocecilia.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.containerContent}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require('@/assets/images/logo-cecilia.png')}
            style={[styles.logo, { height: logoHeight }]}
            contentFit="contain"
          />

          <Text style={styles.subtitulo}>
            Aprenda astronomia{"\n"}brincando ✨
          </Text>

          <Image
            source={require('@/assets/images/ceciliainicio.png')}
            style={[
              styles.cecilia,
              {
                width: ceciliaSize,
                height: ceciliaSize,
              },
            ]}
            contentFit="contain"
          />

          <Pressable style={styles.botao}>
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

  containerContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 14,
  },

  logo: {
    width: '90%',
  },

  subtitulo: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '500',
  },

  cecilia: {
    maxWidth: 360,
    maxHeight: 360,
  },

  botao: {
    width: '90%',
    maxWidth: 380,
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 6,
    textDecorationLine: 'underline',
  },
});