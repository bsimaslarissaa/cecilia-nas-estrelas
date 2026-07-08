import { Image, ImageBackground } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const flutuar = useRef(new Animated.Value(0)).current;
  const entradaCecilia = useRef(new Animated.Value(80)).current;
  const opacidade = useRef(new Animated.Value(0)).current;
  const pulsarBotao = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacidade, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(entradaCecilia, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(flutuar, {
            toValue: -12,
            duration: 1400,
            useNativeDriver: true,
          }),
          Animated.timing(flutuar, {
            toValue: 0,
            duration: 1400,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(pulsarBotao, {
            toValue: 1.04,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(pulsarBotao, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, [entradaCecilia, flutuar, opacidade, pulsarBotao]);

  const irParaSistemaSolar = () => {
    router.push('/solar-system');
  };

  return (
    <ImageBackground
      source={require('@/assets/images/bguniverse.jpeg')}
      style={styles.background}
      contentFit="cover"
    >
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.topo, { opacity: opacidade }]}>
          <Text style={styles.titulo}>
            Olá! Eu sou a{'\n'}
            <Text style={styles.nome}>Cecília!</Text>
          </Text>

          <Text style={styles.texto}>
            Estou muito feliz que você veio!{'\n'}
            Vamos embarcar em uma aventura pelo universo e descobrir planetas,
            estrelas e galáxias.
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.ceciliaContainer,
            {
              opacity: opacidade,
              transform: [
                { translateY: entradaCecilia },
                { translateY: flutuar },
              ],
            },
          ]}
        >
          <Image
            source={require('@/assets/images/ceciliainicio.png')}
            style={styles.cecilia}
            contentFit="contain"
          />
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: pulsarBotao }] }}>
          <Pressable style={styles.botao} onPress={irParaSistemaSolar}>
            <Text style={styles.textoBotao}>Começar aventura </Text>
          </Pressable>
        </Animated.View>
      </SafeAreaView>
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
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    paddingVertical: 30,
  },

  topo: {
    alignItems: 'center',
    gap: 18,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 42,
  },

  nome: {
    color: '#B78DFF',
    fontSize: 44,
  },

  texto: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28,
  },

  ceciliaContainer: {
    width: '100%',
    alignItems: 'center',
  },

  cecilia: {
    width: '95%',
    height: 330,
  },

  botao: {
    width: 310,
    backgroundColor: '#5C38D6',
    paddingVertical: 18,
    borderRadius: 35,
    alignItems: 'center',
    shadowColor: '#8A6CFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
