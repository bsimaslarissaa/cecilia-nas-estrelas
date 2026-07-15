import {
    Canvas,
    Path,
    Skia,
    SkPath,
} from '@shopify/react-native-skia';
import React, { useMemo, useRef, useState } from 'react';
import {
    Image,
    ImageBackground,
    PanResponder,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type Traco = {
  caminho: SkPath;
  cor: string;
  espessura: number;
};

type Props = {
  imagemFundo: any;
  imagemPersonagem?: any;
  titulo: string;
  instrucao: string;
  aoConcluir: () => void;
  aoPular: () => void;
};

const CORES = [
  '#FFD43B',
  '#FF8A00',
  '#FF4D4D',
  '#6C63FF',
];

const ESPESSURAS = [4, 7, 12];

export default function MissaoDesenho({
  imagemFundo,
  imagemPersonagem,
  titulo,
  instrucao,
  aoConcluir,
  aoPular,
}: Props) {
  const [iniciouDesenho, setIniciouDesenho] = useState(false);
  const [tracos, setTracos] = useState<Traco[]>([]);
  const [corAtual, setCorAtual] = useState(CORES[0]);
  const [espessuraAtual, setEspessuraAtual] = useState(7);
  const [rolagemAtiva, setRolagemAtiva] = useState(true);

  const caminhoAtual = useRef<SkPath | null>(null);

  const adicionarNovoTraco = (x: number, y: number) => {
    const novoCaminho = Skia.Path.Make();

    novoCaminho.moveTo(x, y);
    novoCaminho.lineTo(x + 0.1, y + 0.1);

    caminhoAtual.current = novoCaminho;

    setTracos((tracosAnteriores) => [
      ...tracosAnteriores,
      {
        caminho: novoCaminho,
        cor: corAtual,
        espessura: espessuraAtual,
      },
    ]);
  };

  const continuarTraco = (x: number, y: number) => {
    if (!caminhoAtual.current) {
      return;
    }

    caminhoAtual.current.lineTo(x, y);

    setTracos((tracosAnteriores) => [
      ...tracosAnteriores,
    ]);
  };

  const finalizarTraco = () => {
    caminhoAtual.current = null;
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,

        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

        onPanResponderGrant: (evento) => {
          setRolagemAtiva(false);

          const { locationX, locationY } = evento.nativeEvent;

          adicionarNovoTraco(locationX, locationY);
        },

        onPanResponderMove: (evento) => {
          const { locationX, locationY } = evento.nativeEvent;

          continuarTraco(locationX, locationY);
        },

        onPanResponderRelease: () => {
          finalizarTraco();
          setRolagemAtiva(true);
        },

        onPanResponderTerminate: () => {
          finalizarTraco();
          setRolagemAtiva(true);
        },

        onPanResponderTerminationRequest: () => false,
      }),
    [corAtual, espessuraAtual]
  );

  const desfazerUltimoTraco = () => {
    setTracos((tracosAnteriores) =>
      tracosAnteriores.slice(0, -1)
    );
  };

  const limparDesenho = () => {
    setTracos([]);
    caminhoAtual.current = null;
  };

  if (!iniciouDesenho) {
    return (
      <ImageBackground
        source={imagemFundo}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView
          contentContainerStyle={styles.overlay}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardEscolha}>
            {imagemPersonagem && (
              <Image
                source={imagemPersonagem}
                style={styles.personagem}
                resizeMode="contain"
              />
            )}

            <Text style={styles.selo}>
              ATIVIDADE CRIATIVA
            </Text>

            <Text style={styles.titulo}>
              {titulo}
            </Text>

            <Text style={styles.instrucao}>
              {instrucao}
            </Text>

            <Text style={styles.textoOpcional}>
              Esta atividade é opcional. Você pode desenhar agora
              ou receber seu distintivo e continuar a aventura.
            </Text>

            <Pressable
              style={styles.botaoPrincipal}
              onPress={() => setIniciouDesenho(true)}
            >
              <Text style={styles.textoBotao}>
                Fazer desenho 
              </Text>
            </Pressable>

            <View style={styles.separadorContainer}>
              <View style={styles.linhaSeparador} />

              <Text style={styles.textoSeparador}>
                ou
              </Text>

              <View style={styles.linhaSeparador} />
            </View>

            <Pressable
              style={styles.botaoPular}
              onPress={aoPular}
            >
              <Text style={styles.textoBotaoPular}>
                Receber distintivo agora
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={imagemFundo}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={rolagemAtiva}
      >
        <View style={styles.cardDesenho}>
          <Text style={styles.selo}>
            ATIVIDADE CRIATIVA
          </Text>

          <Text style={styles.tituloDesenho}>
            {titulo}
          </Text>

          <Text style={styles.instrucaoDesenho}>
            Desenhe com o dedo ou arrastando o mouse.
          </Text>

          <View
            style={styles.quadro}
            {...panResponder.panHandlers}
          >
            <Canvas
              style={styles.canvas}
              pointerEvents="none"
            >
              {tracos.map((traco, indice) => (
                <Path
                  key={indice}
                  path={traco.caminho}
                  color={traco.cor}
                  style="stroke"
                  strokeWidth={traco.espessura}
                  strokeCap="round"
                  strokeJoin="round"
                />
              ))}
            </Canvas>
          </View>

          <Text style={styles.tituloFerramenta}>
            Escolha uma cor
          </Text>

          <View style={styles.coresContainer}>
            {CORES.map((cor) => (
              <Pressable
                key={cor}
                style={[
                  styles.botaoCor,
                  {
                    backgroundColor: cor,
                  },
                  corAtual === cor && styles.corSelecionada,
                ]}
                onPress={() => setCorAtual(cor)}
              />
            ))}
          </View>

          <Text style={styles.tituloFerramenta}>
            Espessura do pincel
          </Text>

          <View style={styles.espessurasContainer}>
            {ESPESSURAS.map((espessura) => (
              <Pressable
                key={espessura}
                style={[
                  styles.botaoEspessura,
                  espessuraAtual === espessura &&
                    styles.espessuraSelecionada,
                ]}
                onPress={() => setEspessuraAtual(espessura)}
              >
                <View
                  style={[
                    styles.amostraEspessura,
                    {
                      width: espessura * 1.5,
                      height: espessura * 1.5,
                      borderRadius: espessura,
                    },
                  ]}
                />
              </Pressable>
            ))}
          </View>

          <View style={styles.acoesEdicao}>
            <Pressable
              style={[
                styles.botaoEdicao,
                tracos.length === 0 &&
                  styles.botaoEdicaoDesativado,
              ]}
              onPress={desfazerUltimoTraco}
              disabled={tracos.length === 0}
            >
              <Text style={styles.textoBotaoEdicao}>
                ↶ Desfazer
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.botaoEdicao,
                tracos.length === 0 &&
                  styles.botaoEdicaoDesativado,
              ]}
              onPress={limparDesenho}
              disabled={tracos.length === 0}
            >
              <Text style={styles.textoBotaoEdicao}>
                Limpar
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={[
              styles.botaoPrincipal,
              tracos.length === 0 &&
                styles.botaoDesativado,
            ]}
            onPress={aoConcluir}
            disabled={tracos.length === 0}
          >
            <Text style={styles.textoBotao}>
              Concluir desenho
            </Text>
          </Pressable>

          <Pressable
            style={styles.botaoSecundario}
            onPress={aoPular}
          >
            <Text style={styles.textoBotaoSecundario}>
              Sair sem salvar e receber distintivo
            </Text>
          </Pressable>
        </View>
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

  overlay: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: 'rgba(3, 4, 20, 0.58)',
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 28,
    backgroundColor: 'rgba(3, 4, 20, 0.58)',
  },

  cardEscolha: {
    width: '100%',
    maxWidth: 620,
    alignItems: 'center',
    backgroundColor: 'rgba(15, 18, 36, 0.97)',
    borderWidth: 2,
    borderColor: '#8A6CFF',
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 24,
  },

  cardDesenho: {
    width: '100%',
    maxWidth: 760,
    alignItems: 'center',
    backgroundColor: 'rgba(15, 18, 36, 0.97)',
    borderWidth: 2,
    borderColor: '#8A6CFF',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 22,
  },

  personagem: {
    width: 115,
    height: 135,
    marginBottom: 6,
  },

  selo: {
    color: '#B89CFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    textAlign: 'center',
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 7,
  },

  tituloDesenho: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 6,
  },

  instrucao: {
    color: '#E8E6F4',
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
    marginTop: 12,
  },

  instrucaoDesenho: {
    color: '#E8E6F4',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 14,
  },

  textoOpcional: {
    color: '#FFD86B',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 14,
  },

  separadorContainer: {
    width: '100%',
    maxWidth: 360,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },

  linhaSeparador: {
    flex: 1,
    height: 1,
    backgroundColor: '#514B70',
  },

  textoSeparador: {
    color: '#AFA8C8',
    fontSize: 13,
    marginHorizontal: 12,
  },

  botaoPular: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    backgroundColor: '#292342',
    borderWidth: 2,
    borderColor: '#8A6CFF',
    borderRadius: 30,
    paddingVertical: 14,
    marginTop: 14,
  },

  textoBotaoPular: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  quadro: {
    width: '100%',
    height: 300,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#B78DFF',
    borderRadius: 18,
  },

  canvas: {
    flex: 1,
  },

  tituloFerramenta: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 9,
  },

  coresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
  },

  botaoCor: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  corSelecionada: {
    borderWidth: 5,
    borderColor: '#FFFFFF',
    transform: [{ scale: 1.12 }],
  },

  espessurasContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },

  botaoEspessura: {
    width: 52,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292342',
    borderWidth: 2,
    borderColor: '#514B70',
    borderRadius: 12,
  },

  espessuraSelecionada: {
    borderColor: '#B78DFF',
    backgroundColor: '#3A2F67',
  },

  amostraEspessura: {
    backgroundColor: '#FFFFFF',
  },

  acoesEdicao: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },

  botaoEdicao: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#292342',
    borderWidth: 1,
    borderColor: '#625A88',
    borderRadius: 18,
    paddingVertical: 12,
  },

  botaoEdicaoDesativado: {
    opacity: 0.45,
  },

  textoBotaoEdicao: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  botaoPrincipal: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    backgroundColor: '#5C38D6',
    borderRadius: 30,
    paddingVertical: 15,
    marginTop: 20,

    shadowColor: '#8A6CFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },

  botaoDesativado: {
    backgroundColor: '#4A4660',
    opacity: 0.65,
    shadowOpacity: 0,
    elevation: 0,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  botaoSecundario: {
    paddingVertical: 13,
    paddingHorizontal: 18,
    marginTop: 10,
  },

  textoBotaoSecundario: {
    color: '#C8B6FF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});