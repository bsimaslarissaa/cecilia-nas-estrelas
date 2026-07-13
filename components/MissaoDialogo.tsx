import { Stack, router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type LadoPersonagem = 'esquerda' | 'direita';

type Fala = {
  nome: string;
  lado: LadoPersonagem;
  expressao: string;
  texto: string;
};

type Props = {
  imagemFundo: ImageSourcePropType;
  avatares: Record<string, Record<string, any>>;
  dialogos: Fala[];
  aoFinalizar?: () => void;
};


const AJUSTE_VERTICAL: Record<string, number> = {
  Cecília: 0,
  Cosmo: 15,
  Melinda: 15,
  Aurora: 15,
  Tito: 15,
  Luna: 15,
  Enrique: 15,
  Lucas: 15,
  Téo: 15,
  Nuri: 15,
};

export default function MissaoDialogo({
  imagemFundo,
  avatares,
  dialogos,
  aoFinalizar,
}: Props) {
  const [indiceFala, setIndiceFala] = useState(0);

  const animacaoPulo = useRef(new Animated.Value(0)).current;
  const animacaoOpacidade = useRef(new Animated.Value(0)).current;

  const falaAtiva = dialogos[indiceFala];
  const imagemPersonagem =
    avatares[falaAtiva.nome][falaAtiva.expressao];

  const ajusteVertical = AJUSTE_VERTICAL[falaAtiva.nome] ?? 0;

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
  }, [indiceFala, animacaoOpacidade, animacaoPulo]);

  const avancarDialogo = () => {
  if (indiceFala < dialogos.length - 1) {
    setIndiceFala(indiceFala + 1);
  } else {
    if (aoFinalizar) {
      aoFinalizar();
    } else {
      router.back();
    }
  }
};

  const personagemAnimado = (
    <Animated.View
      style={[
        styles.avatarWrapper,
        {
          opacity: animacaoOpacidade,
          transform: [
            { translateY: animacaoPulo },
            { translateY: ajusteVertical },
          ],
        },
      ]}
    >
      <Image
        source={imagemPersonagem}
        style={styles.avatarImage}
        resizeMode="contain"
      />
    </Animated.View>
  );

  return (
    <ImageBackground
      source={imagemFundo}
      style={styles.background}
      resizeMode="cover"
    >
      <Stack.Screen options={{ orientation: 'landscape' }} />

      <View style={styles.gameArea}>
        <View style={styles.characterContainer}>
          <View style={styles.leftSlot}>
            {falaAtiva.lado === 'esquerda' && personagemAnimado}
          </View>

          <View style={styles.rightSlot}>
            {falaAtiva.lado === 'direita' && personagemAnimado}
          </View>
        </View>

        <Pressable
          style={styles.dialogoBox}
          onPress={avancarDialogo}
        >
          <View style={styles.headerBox}>
            <Text style={styles.nomeText}>
              {falaAtiva.nome}
            </Text>

            <Text style={styles.contadorText}>
              {indiceFala + 1}/{dialogos.length}
            </Text>
          </View>

          <Text style={styles.balaoText}>
            {falaAtiva.texto}
          </Text>

          <Text style={styles.toqueParaAvancar}>
            Toque para avançar ▶
          </Text>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 35,
  },

  characterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: -20,
    paddingHorizontal: 20,
    zIndex: 1,
  },

  leftSlot: {
    width: 150,
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  rightSlot: {
    width: 150,
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  avatarWrapper: {
    width: 150,
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  avatarImage: {
    width: 150,
    height: 200,
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
    zIndex: 2,
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