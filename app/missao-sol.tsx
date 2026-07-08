import { Stack, router } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, Animated } from 'react-native'; 
import { Image } from 'expo-image';

const AVATARES: Record<string, Record<string, any>> = {
  Cecília: {
    aoversol: require('@/assets/images/cecisol.png'),
    curiosa: require('@/assets/images/cecicuriosa.png'),
    pensativa: require('@/assets/images/cecifeliz.png'),
    feliz: require('@/assets/images/cecialegrecuriosa.png'),
  },
  Cosmo: {
    falando: require('@/assets/images/cosmo.png'),
  },
  Melinda: {
    explicando: require('@/assets/images/melinda.png'),
  },
  Aurora: {
    explicando: require('@/assets/images/aurora.png'),
  },
};

export default function MissionScreen() {
  const [indiceFala, setIndiceFala] = useState(0);


  const animacaoPulo = useRef(new Animated.Value(0)).current;
  const animacaoOpacidade = useRef(new Animated.Value(0)).current;

  const dialogos = [
    { nome: 'Cecília', lado: 'esquerda', expressao: 'aoversol', texto: 'Uau! Que clarão é esse? Parece uma enorme bola dourada!' },
    { nome: 'Cosmo', lado: 'direita', expressao: 'falando', texto: 'Sensores ativados! Estamos observando a estrela mais importante do nosso Sistema Solar.' },
    { nome: 'Cecília', lado: 'esquerda', expressao: 'curiosa', texto: 'Espera aí... então o Sol não é um planeta?' },
    { nome: 'Melinda', lado: 'direita', expressao: 'explicando', texto: 'Isso mesmo! O Sol é uma estrela. Ele produz luz e calor.' },
    { nome: 'Aurora', lado: 'direita', expressao: 'explicando', texto: 'Todos os planetas giram ao redor dele. Sem o Sol, nosso planeta seria muito frio e escuro.' },
    { nome: 'Cecília', lado: 'esquerda', expressao: 'pensativa', texto: 'Então podemos dizer que ele é o coração do Sistema Solar?' },
    { nome: 'Aurora', lado: 'direita', expressao: 'explicando', texto: 'Gostei dessa comparação! De certa forma, sim. A gravidade do Sol ajuda a manter os planetas em suas órbitas, e sua luz e seu calor tornam a vida na Terra possível.' },
    { nome: 'Cecília', lado: 'esquerda', expressao: 'feliz', texto: 'Que bom que nossa aventura começou por aqui!' },
  ];

  const falaAtiva = dialogos[indiceFala];


  useEffect(() => {
  
    animacaoPulo.setValue(15);
    animacaoOpacidade.setValue(0); 

    Animated.parallel([
      Animated.timing(animacaoOpacidade, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(animacaoPulo, {
        toValue: 0,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [indiceFala]);

  const avancarDialogo = () => {
    if (indiceFala < dialogos.length - 1) {
      setIndiceFala(indiceFala + 1);
    } else {
      router.back(); 
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/nave.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <Stack.Screen options={{ orientation: 'landscape' }} />

      <View style={styles.gameArea}>
        
        <View style={styles.characterContainer}>
          
          <View style={styles.leftSlot}>
            {falaAtiva.lado === 'esquerda' && (
              <Animated.View style={{ 
                opacity: animacaoOpacidade,
                transform: [{ translateY: animacaoPulo }] 
              }}>
                <Image
                  source={AVATARES[falaAtiva.nome][falaAtiva.expressao]}
                  style={styles.avatarImage}
                  contentFit="contain"
                />
              </Animated.View>
            )}
          </View>

          <View style={styles.rightSlot}>
            {falaAtiva.lado === 'direita' && (
              <Animated.View style={{ 
                opacity: animacaoOpacidade,
                transform: [{ translateY: animacaoPulo }] 
              }}>
                <Image
                  source={AVATARES[falaAtiva.nome][falaAtiva.expressao]}
                  style={styles.avatarImage}
                  contentFit="contain"
                />
              </Animated.View>
            )}
          </View>
          
        </View>

        <Pressable style={styles.dialogoBox} onPress={avancarDialogo}>
          <View style={styles.headerBox}>
            <Text style={styles.nomeText}>{falaAtiva.nome}</Text>
            <Text style={styles.contadorText}>{indiceFala + 1}/{dialogos.length}</Text>
          </View>
          <Text style={styles.balaoText}>{falaAtiva.texto}</Text>
          <Text style={styles.toqueParaAvancar}>Toque para avançar ▶</Text>
        </Pressable>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gameArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.15)', 
    justifyContent: 'flex-end',
    padding: 16,
  },
  characterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: -10,
    paddingHorizontal: 20,
  },
  leftSlot: {
    width: 130,
    height: 180,
    justifyContent: 'flex-end',
  },
  rightSlot: {
    width: 130,
    height: 180,
    justifyContent: 'flex-end',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  dialogoBox: {
    backgroundColor: 'rgba(15, 18, 36, 0.95)',
    borderWidth: 2,
    borderColor: '#8A6CFF',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: '95%',
    alignSelf: 'center',
    minHeight: 110,
  },
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nomeText: {
    color: '#00FFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contadorText: {
    color: '#8A6CFF',
    fontSize: 12,
  },
  balaoText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 20,
  },
  toqueParaAvancar: {
    color: '#8A6CFF',
    fontSize: 10,
    textAlign: 'right',
    marginTop: 6,
    fontWeight: 'bold',
  },
});
