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

type Ferramenta = 'pincel' | 'borracha';

type Traco = {
  caminho: SkPath;
  cor: string;
  espessura: number;
  ferramenta: Ferramenta;
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
  '#FF69B4', 
  '#9C27B0', 
  '#6C63FF', 
  '#2196F3', 
  '#00BCD4', 
  '#4CAF50', 
  '#8BC34A', 
  '#8D6E63', 
  '#000000', 
];

const ESPESSURAS = [4, 7, 12];
const ESPESSURA_BORRACHA = 30;

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
  const [ferramentaAtual, setFerramentaAtual] =
    useState<Ferramenta>('pincel');
  const [rolagemAtiva, setRolagemAtiva] = useState(true);
  const [versaoDesenho, setVersaoDesenho] = useState(0);

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
        espessura:
          ferramentaAtual === 'borracha'
            ? ESPESSURA_BORRACHA
            : espessuraAtual,
        ferramenta: ferramentaAtual,
      },
    ]);

    setVersaoDesenho((versaoAnterior) => versaoAnterior + 1);
  };

  const continuarTraco = (x: number, y: number) => {
    if (!caminhoAtual.current) {
      return;
    }

    caminhoAtual.current.lineTo(x, y);

    
    setVersaoDesenho((versaoAnterior) => versaoAnterior + 1);
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
    [corAtual, espessuraAtual, ferramentaAtual]
  );

  const selecionarCor = (cor: string) => {
    setCorAtual(cor);
    setFerramentaAtual('pincel');
  };

  const limparDesenho = () => {
    setTracos([]);
    caminhoAtual.current = null;
    setVersaoDesenho((versaoAnterior) => versaoAnterior + 1);
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

            <Text style={styles.selo}>ATIVIDADE CRIATIVA</Text>

            <Text style={styles.titulo}>{titulo}</Text>

            <Text style={styles.instrucao}>{instrucao}</Text>

            <Text style={styles.textoOpcional}>
              Esta atividade é opcional. Você pode desenhar agora ou
              receber seu distintivo e continuar a aventura.
            </Text>

            <Pressable
              style={styles.botaoPrincipal}
              onPress={() => setIniciouDesenho(true)}
            >
              <Text style={styles.textoBotao}>Fazer desenho</Text>
            </Pressable>

            <View style={styles.separadorContainer}>
              <View style={styles.linhaSeparador} />
              <Text style={styles.textoSeparador}>ou</Text>
              <View style={styles.linhaSeparador} />
            </View>

            <Pressable style={styles.botaoPular} onPress={aoPular}>
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
          <Text style={styles.selo}>ATIVIDADE CRIATIVA</Text>

          <Text style={styles.tituloDesenho}>{titulo}</Text>

          <Text style={styles.instrucaoDesenho}>
            Desenhe com o dedo ou arrastando o mouse.
          </Text>

          <View style={styles.quadro} {...panResponder.panHandlers}>
            <Canvas
              key={`canvas-${tracos.length}`}
              style={styles.canvas}
              pointerEvents="none"
            >
              {tracos.map((traco, indice) => (
                <Path
                  key={`${indice}-${versaoDesenho}`}
                  path={traco.caminho}
                  color={traco.cor}
                  style="stroke"
                  strokeWidth={traco.espessura}
                  strokeCap="round"
                  strokeJoin="round"
                  blendMode={
                    traco.ferramenta === 'borracha'
                      ? 'clear'
                      : 'srcOver'
                  }
                />
              ))}
            </Canvas>
          </View>

          <Text style={styles.tituloFerramenta}>Escolha uma cor</Text>

          <View style={styles.coresContainer}>
            {CORES.map((cor) => (
              <Pressable
                key={cor}
                accessibilityRole="button"
                accessibilityLabel={`Selecionar a cor ${cor}`}
                style={[
                  styles.botaoCor,
                  { backgroundColor: cor },
                  ferramentaAtual === 'pincel' &&
                    corAtual === cor &&
                    styles.corSelecionada,
                ]}
                onPress={() => selecionarCor(cor)}
              />
            ))}
          </View>

          <Text style={styles.tituloFerramenta}>Ferramentas</Text>

          <View style={styles.ferramentasContainer}>
            <Pressable
              style={[
                styles.botaoFerramenta,
                ferramentaAtual === 'pincel' &&
                  styles.ferramentaSelecionada,
              ]}
              onPress={() => setFerramentaAtual('pincel')}
            >
              <Text style={styles.textoBotaoFerramenta}>Pincel</Text>
            </Pressable>

            <Pressable
              style={[
                styles.botaoFerramenta,
                ferramentaAtual === 'borracha' &&
                  styles.ferramentaSelecionada,
              ]}
              onPress={() => setFerramentaAtual('borracha')}
            >
              <Text style={styles.textoBotaoFerramenta}>Borracha</Text>
            </Pressable>
          </View>

          <Text style={styles.tituloFerramenta}>
            Espessura
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
                onPress={() => {
                  setEspessuraAtual(espessura);
                  setFerramentaAtual('pincel');
                }}
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
                tracos.length === 0 && styles.botaoEdicaoDesativado,
              ]}
              onPress={limparDesenho}
              disabled={tracos.length === 0}
            >
              <Text style={styles.textoBotaoEdicao}>Limpar desenho</Text>
            </Pressable>
          </View>

          <Pressable
            style={[
              styles.botaoPrincipal,
              tracos.length === 0 && styles.botaoDesativado,
            ]}
            onPress={aoConcluir}
            disabled={tracos.length === 0}
          >
            <Text style={styles.textoBotao}> Concluir desenho</Text>
          </Pressable>

          <Pressable style={styles.botaoSecundario} onPress={aoPular}>
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
    paddingHorizontal: 18,
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
    paddingHorizontal: 20,
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
    height: 320,
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
    width: '100%',
    maxWidth: 430,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },

  botaoCor: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  corSelecionada: {
    borderWidth: 4,
    borderColor: '#FFD54F',
    transform: [{ scale: 1.16 }],
  },

  ferramentasContainer: {
    width: '100%',
    maxWidth: 360,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },

  botaoFerramenta: {
    flex: 1,
    minHeight: 58,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#292342',
    borderWidth: 2,
    borderColor: '#514B70',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },

  ferramentaSelecionada: {
    borderColor: '#FFD54F',
    backgroundColor: '#3A2F67',
  },

  textoBotaoFerramenta: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  espessurasContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },

  botaoEspessura: {
    width: 54,
    height: 44,
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
    paddingHorizontal: 16,
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
    textAlign: 'center',
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