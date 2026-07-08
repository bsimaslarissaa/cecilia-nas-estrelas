import { Image, ImageBackground } from 'expo-image';
import { router, Stack } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SolarSystemScreen() {
  const flutuar = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(flutuar, {
          toValue: -8,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(flutuar, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [flutuar]);

  const irParaSol = () => router.push('/missao-sol' as any);
  const irParaMercurio = () => router.push('/missao-mercurio' as any);
  const irParaVenus = () => router.push('/missao-venus' as any);
  const irParaTerra = () => router.push('/missao-terra' as any);
  const irParaMarte = () => router.push('/missao-marte' as any);
  const irParaJupiter = () => router.push('/missao-jupiter' as any);
  const irParaSaturno = () => router.push('/missao-saturno' as any);
  const irParaUrano = () => router.push('/missao-urano' as any);
  const irParaNetuno = () => router.push('/missao-netuno' as any);

  return (
    <ImageBackground
      source={require('@/assets/images/bguniverse.jpeg')}
      style={styles.background}
      contentFit="cover"
    >
      <Stack.Screen options={{ orientation: 'landscape' }} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.screen}> 
          <View style={styles.header}>
            <Text style={styles.titulo}>Sistema Solar </Text>
            <Text style={styles.subtitulo}>
              Toque em um planeta para começar uma missão.
            </Text>
          </View>

          <View style={styles.spaceArea}>
            <Pressable style={styles.solContainer} onPress={irParaSol}>
              <Animated.View style={{ transform: [{ translateY: flutuar }] }}>
                <Image
                  source={require('@/assets/images/sol.png')}
                  style={styles.sol}
                  contentFit="contain"
                />
                <Text style={styles.nomeSol}>Sol</Text>
              </Animated.View>
            </Pressable>

            <Pressable style={styles.mercurioContainer} onPress={irParaMercurio}>
              <Animated.View style={{ transform: [{ translateY: flutuar }] }}>
                <Image
                  source={require('@/assets/images/mercurio.png')}
                  style={styles.planetaPequeno}
                  contentFit="contain"
                />
                <Text style={styles.nomePlaneta}>Mercúrio</Text>
              </Animated.View>
            </Pressable>

            <Pressable style={styles.venusContainer} onPress={irParaVenus}>
              <Animated.View style={{ transform: [{ translateY: flutuar }] }}>
                <Image
                  source={require('@/assets/images/venus.png')}
                  style={styles.planetaMedio}
                  contentFit="contain"
                />
                <Text style={styles.nomePlaneta}>Vênus</Text>
              </Animated.View>
            </Pressable>

            <Pressable style={styles.terraContainer} onPress={irParaTerra}>
              <Animated.View style={{ transform: [{ translateY: flutuar }] }}>
                <Image
                  source={require('@/assets/images/terra.png')}
                  style={styles.planetaMedio}
                  contentFit="contain"
                />
                <Text style={styles.nomePlaneta}>Terra</Text>
              </Animated.View>
            </Pressable>

            <Pressable style={styles.marteContainer} onPress={irParaMarte}>
              <Animated.View style={{ transform: [{ translateY: flutuar }] }}>
                <Image
                  source={require('@/assets/images/marte.png')}
                  style={styles.planetaPequeno}
                  contentFit="contain"
                />
                <Text style={styles.nomePlaneta}>Marte</Text>
              </Animated.View>
            </Pressable>

            <Pressable style={styles.jupiterContainer} onPress={irParaJupiter}>
              <Animated.View style={{ transform: [{ translateY: flutuar }] }}>
                <Image
                  source={require('@/assets/images/jupiter.png')}
                  style={styles.planetaGrande}
                  contentFit="contain"
                />
                <Text style={styles.nomePlaneta}>Júpiter</Text>
              </Animated.View>
            </Pressable>

            <Pressable style={styles.saturnoContainer} onPress={irParaSaturno}>
              <Animated.View style={{ transform: [{ translateY: flutuar }] }}>
                <Image
                  source={require('@/assets/images/saturno.png')}
                  style={styles.saturno}
                  contentFit="contain"
                />
                <Text style={styles.nomePlaneta}>Saturno</Text>
              </Animated.View>
            </Pressable>

            <Pressable style={styles.uranoContainer} onPress={irParaUrano}>
              <Animated.View style={{ transform: [{ translateY: flutuar }] }}>
                <Image
                  source={require('@/assets/images/urano.png')}
                  style={styles.planetaMedio}
                  contentFit="contain"
                />
                <Text style={styles.nomePlaneta}>Urano</Text>
              </Animated.View>
            </Pressable>

            <Pressable style={styles.netunoContainer} onPress={irParaNetuno}>
              <Animated.View style={{ transform: [{ translateY: flutuar }] }}>
                <Image
                  source={require('@/assets/images/netuno.png')}
                  style={styles.planetaMedio}
                  contentFit="contain"
                />
                <Text style={styles.nomePlaneta}>Netuno</Text>
              </Animated.View>
            </Pressable>
          </View>
        </View>
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

  screen: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12, 
  },

  header: {
    alignItems: 'center',
    marginTop: 0,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 26, 
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitulo: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 18,
  },

  spaceArea: {
    flex: 1,
    position: 'relative',
    marginTop: 10, 
  },

  nomePlaneta: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 2,
    textShadowColor: '#8A6CFF',
    textShadowRadius: 8,
  },

  nomeSol: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: -10,
    textShadowColor: '#8A6CFF',
    textShadowRadius: 8,
  },

  solContainer: {
    position: 'absolute',
    left: -60,
    top: '15%',
    alignItems: 'center',
  },

  sol: {
    width: 160,
    height: 160,
  },

  mercurioContainer: {
    position: 'absolute',
    left: '16%',
    top: '45%',
    alignItems: 'center',
  },

  venusContainer: {
    position: 'absolute',
    left: '26%',
    top: '25%',
    alignItems: 'center',
  },

  terraContainer: {
    position: 'absolute',
    left: '37%',
    top: '50%',
    alignItems: 'center',
  },

  marteContainer: {
    position: 'absolute',
    left: '49%',
    top: '30%',
    alignItems: 'center',
  },

  jupiterContainer: {
    position: 'absolute',
    left: '60%',
    top: '15%',
    alignItems: 'center',
  },

  saturnoContainer: {
    position: 'absolute',
    left: '73%',
    top: '40%',
    alignItems: 'center',
  },

  uranoContainer: {
    position: 'absolute',
    left: '86%',
    top: '20%',
    alignItems: 'center',
  },

  netunoContainer: {
    position: 'absolute',
    right: -10, // Encostado na borda direita
    top: '55%',
    alignItems: 'center',
  },

  // TAMANHOS ORIGINAIS DOS PLANETAS PRESERVADOS
  planetaPequeno: {
    width: 50,
    height: 50,
  },

  planetaMedio: {
    width: 66,
    height: 66,
  },

  planetaGrande: {
    width: 95,
    height: 95,
  },

  saturno: {
    width: 130,
    height: 95,
  },
});
