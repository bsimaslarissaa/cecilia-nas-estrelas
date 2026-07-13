import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = {
  imagemFundo: any;
  imagemDistintivo: any;
  titulo: string;
  mensagem: string;
  aoContinuar: () => void;
};

export default function MissaoDistintivo({
  imagemFundo,
  imagemDistintivo,
  titulo,
  mensagem,
  aoContinuar,
}: Props) {
  const escala = useRef(new Animated.Value(0.5)).current;
  const opacidade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(escala, {
        toValue: 1,
        friction: 4,
        tension: 45,
        useNativeDriver: true,
      }),

      Animated.timing(opacidade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [escala, opacidade]);

  return (
    <ImageBackground
      source={imagemFundo}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.card,
            {
              opacity: opacidade,
              transform: [{ scale: escala }],
            },
          ]}
        >
          <Text style={styles.parabens}>PARABÉNS!</Text>

          <Text style={styles.subtitulo}>
            Distintivo desbloqueado
          </Text>

          <View style={styles.distintivo}>
           <Image
              source={imagemDistintivo}
              style={styles.imagemDistintivo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.titulo}>{titulo}</Text>

          <Text style={styles.mensagem}>{mensagem}</Text>

          <Pressable style={styles.botao} onPress={aoContinuar}>
            <Text style={styles.textoBotao}>
              Continuar aventura 
            </Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 30,
    backgroundColor: 'rgba(3, 4, 20, 0.55)',
  },

  card: {
    width: '100%',
    maxWidth: 620,
    backgroundColor: 'rgba(15, 18, 36, 0.97)',
    borderWidth: 2,
    borderColor: '#FFD86B',
    borderRadius: 28,
    paddingHorizontal: 28,
    paddingVertical: 28,
    alignItems: 'center',

    shadowColor: '#FFD86B',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },

  parabens: {
    color: '#FFD86B',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitulo: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 18,
  },

  distintivo: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5C38D6',
    borderWidth: 4,
    borderColor: '#FFD86B',

    shadowColor: '#FFD86B',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },

  imagemDistintivo: {
  width: 120,
  height: 120,
},

  titulo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 18,
  },

  mensagem: {
    color: '#E8E6F4',
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
    marginTop: 12,
  },

  botao: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#5C38D6',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 24,

    shadowColor: '#8A6CFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});