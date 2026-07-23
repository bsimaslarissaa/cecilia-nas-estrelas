import MissaoDesenho from '@/components/MissaoDesenho';
import MissaoDialogo from '@/components/MissaoDialogo';
import MissaoDistintivo from '@/components/MissaoDistintivo';
import { router } from 'expo-router';
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type EtapaMissao =
  | 'dialogo'
  | 'exploracao'
  | 'desenho'
  | 'distintivo';

type PlanetaAnao = {
  id: string;
  nome: string;
  imagem: ImageSourcePropType;
  curiosidade: string;
};

type PlanetaFlutuanteProps = {
  planeta: PlanetaAnao;
  indice: number;
  visitado: boolean;
  selecionado: boolean;
  aoSelecionar: (planeta: PlanetaAnao) => void;
};

type DistintivoAnimadoProps = {
  imagem: ImageSourcePropType;
};

const IMAGEM_FUNDO = require(
  '@/assets/images/nave-planeta-anoes.jpeg'
);

const IMAGEM_MALU = require('@/assets/images/malu.png');

const IMAGEM_DISTINTIVO = require(
  '@/assets/images/distintivo-planetas-anoes.png'
);

const AVATARES: Record<string, Record<string, any>> = {
  Cecília: {
    feliz: require('@/assets/images/cecifeliz.png'),
    curiosa: require('@/assets/images/cecicuriosa.png'),
    alegre: require('@/assets/images/cecialegrecuriosa.png'),
    surpresa: require('@/assets/images/cecialegrecuriosa.png'),
  },

  Cosmo: {
    falando: require('@/assets/images/cosmo.png'),
  },

  Aurora: {
    explicando: require('@/assets/images/aurora.png'),
  },

  Melinda: {
    explicando: require('@/assets/images/melinda.png'),
  },

  Malu: {
    falando: IMAGEM_MALU,
    explicando: IMAGEM_MALU,
    feliz: IMAGEM_MALU,
  },
};

const DIALOGOS: {
  nome: string;
  lado: 'esquerda' | 'direita';
  expressao: string;
  texto: string;
}[] = [
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Bip! A rota pelos oito planetas foi concluída, mas estou detectando outros mundos além de Netuno.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'surpresa',
    texto:
      'Outros mundos? Então ainda existem mais planetas para conhecer?',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Existem vários corpos celestes no Sistema Solar. Alguns deles são classificados como planetas anões.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'curiosa',
    texto:
      'Planetas anões? Eles são apenas planetas muito pequenos?',
  },
  {
    nome: 'Melinda',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Eles possuem algumas características dos planetas, como girar ao redor do Sol e ter formato quase arredondado.',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Porém, eles não conseguiram limpar completamente a região de sua órbita. Por isso pertencem a uma categoria diferente.',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Cinco destinos principais identificados: Ceres, Plutão, Haumea, Makemake e Éris.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'alegre',
    texto:
      'São muitos nomes diferentes! Quem vai nos ajudar a explorar esses pequenos mundos?',
  },
  {
    nome: 'Malu',
    lado: 'direita',
    expressao: 'feliz',
    texto:
      'Olá, exploradores! Eu sou a Malu e adoro investigar os mistérios do espaço.',
  },
  {
    nome: 'Malu',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Preparei um painel especial. Toquem em cada planeta anão para descobrir uma curiosidade.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'feliz',
    texto:
      'Vamos começar! Quero descobrir o que torna cada um deles especial.',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Painel de exploração ativado. Curiosidade da tripulação em nível máximo.',
  },
];

const PLANETAS_ANOES: PlanetaAnao[] = [
  {
    id: 'ceres',
    nome: 'Ceres',
    imagem: require('@/assets/images/ceres.png'),
    curiosidade:
      'Ceres fica no Cinturão de Asteroides, entre Marte e Júpiter. Ele é o único planeta anão localizado nessa região e possui gelo em sua superfície.',
  },
  {
    id: 'plutao',
    nome: 'Plutão',
    imagem: require('@/assets/images/plutao.png'),
    curiosidade:
      'Plutão já foi considerado o nono planeta do Sistema Solar. Ele possui montanhas de gelo e uma grande região em formato parecido com um coração.',
  },
  {
    id: 'haumea',
    nome: 'Haumea',
    imagem: require('@/assets/images/haumea.png'),
    curiosidade:
      'Haumea possui um formato alongado porque gira muito rapidamente. Ele também possui duas luas e um anel fino ao seu redor.',
  },
  {
    id: 'makemake',
    nome: 'Makemake',
    imagem: require('@/assets/images/makemake.png'),
    curiosidade:
      'Makemake é um mundo extremamente frio do Cinturão de Kuiper. Sua superfície possui gelo de metano e ele tem uma pequena lua.',
  },
  {
    id: 'eris',
    nome: 'Éris',
    imagem: require('@/assets/images/eris.png'),
    curiosidade:
      'Éris está muito distante do Sol. Sua descoberta foi importante para que os cientistas discutissem uma nova definição para os planetas.',
  },
];

function PlanetaFlutuante({
  planeta,
  indice,
  visitado,
  selecionado,
  aoSelecionar,
}: PlanetaFlutuanteProps) {
  const animacaoFlutuacao = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    const animacao = Animated.loop(
      Animated.sequence([
        Animated.delay(indice * 180),

        Animated.timing(animacaoFlutuacao, {
          toValue: -8,
          duration: 1300 + indice * 100,
          useNativeDriver: true,
        }),

        Animated.timing(animacaoFlutuacao, {
          toValue: 7,
          duration: 1500 + indice * 100,
          useNativeDriver: true,
        }),

        Animated.timing(animacaoFlutuacao, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animacao.start();

    return () => {
      animacao.stop();
      animacaoFlutuacao.setValue(0);
    };
  }, [animacaoFlutuacao, indice]);

  return (
    <Animated.View
      style={[
        styles.planetaFlutuante,
        {
          transform: [
            {
              translateY: animacaoFlutuacao,
            },
          ],
        },
      ]}
    >
      <Pressable
        onPress={() => aoSelecionar(planeta)}
        accessibilityRole="button"
        accessibilityLabel={`Explorar ${planeta.nome}`}
        style={({ pressed }) => [
          styles.areaPlanetaClicavel,
          selecionado && styles.planetaSelecionado,
          pressed && styles.planetaPressionado,
        ]}
      >
        <View style={styles.areaImagemPlaneta}>
          <Image
            source={planeta.imagem}
            style={styles.imagemPlaneta}
            resizeMode="contain"
          />

          {visitado && (
            <View style={styles.statusPlaneta}>
              <Text style={styles.textoStatus}>✓</Text>
            </View>
          )}
        </View>

        <View
          style={[
            styles.etiquetaPlaneta,
            visitado && styles.etiquetaPlanetaVisitado,
          ]}
        >
          <Text style={styles.nomeBotaoPlaneta}>
            {planeta.nome}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

function DistintivoAnimado({
  imagem,
}: DistintivoAnimadoProps) {
  const rotacao = useRef(new Animated.Value(0)).current;
  const escala = useRef(new Animated.Value(0)).current;
  const flutuacao = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animacaoFlutuante: Animated.CompositeAnimation;

    Animated.parallel([
      Animated.spring(escala, {
        toValue: 1,
        friction: 5,
        tension: 55,
        useNativeDriver: true,
      }),

      Animated.timing(rotacao, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      animacaoFlutuante = Animated.loop(
        Animated.sequence([
          Animated.timing(flutuacao, {
            toValue: -6,
            duration: 1100,
            useNativeDriver: true,
          }),

          Animated.timing(flutuacao, {
            toValue: 6,
            duration: 1100,
            useNativeDriver: true,
          }),

          Animated.timing(flutuacao, {
            toValue: 0,
            duration: 700,
            useNativeDriver: true,
          }),
        ])
      );

      animacaoFlutuante.start();
    });

    return () => {
      rotacao.stopAnimation();
      escala.stopAnimation();
      flutuacao.stopAnimation();

      if (animacaoFlutuante) {
        animacaoFlutuante.stop();
      }
    };
  }, [escala, flutuacao, rotacao]);

  const giro = rotacao.interpolate({
    inputRange: [0, 1],
    outputRange: ['-360deg', '0deg'],
  });

  return (
    <Animated.Image
      source={imagem}
      resizeMode="contain"
      style={[
        styles.previaDistintivo,
        {
          transform: [
            { rotate: giro },
            { scale: escala },
            { translateY: flutuacao },
          ],
        },
      ]}
    />
  );
}

export default function MissaoPlanetasAnoesScreen() {
  const [etapa, setEtapa] =
    useState<EtapaMissao>('dialogo');

  const [planetaSelecionado, setPlanetaSelecionado] =
    useState<PlanetaAnao | null>(null);

  const [planetasVisitados, setPlanetasVisitados] = useState<
    string[]
  >([]);

  const selecionarPlaneta = (planeta: PlanetaAnao) => {
    setPlanetaSelecionado(planeta);

    setPlanetasVisitados((visitadosAtuais) => {
      if (visitadosAtuais.includes(planeta.id)) {
        return visitadosAtuais;
      }

      return [...visitadosAtuais, planeta.id];
    });
  };

  const planetaFoiVisitado = (id: string) => {
    return planetasVisitados.includes(id);
  };

  const todosForamVisitados =
    planetasVisitados.length === PLANETAS_ANOES.length;

  const concluirExploracao = () => {
    setPlanetaSelecionado(null);
    setEtapa('desenho');
  };

  const concluirDesenho = () => {
    setEtapa('distintivo');
  };

  const voltarAoSistemaSolar = () => {
    router.replace('/solar-system' as any);
  };

  if (etapa === 'dialogo') {
    return (
      <MissaoDialogo
        imagemFundo={IMAGEM_FUNDO}
        avatares={AVATARES}
        dialogos={DIALOGOS}
        aoFinalizar={() => setEtapa('exploracao')}
      />
    );
  }

  if (etapa === 'exploracao') {
    return (
      <ImageBackground
        source={IMAGEM_FUNDO}
        style={styles.fundo}
        resizeMode="cover"
      >
        <View style={styles.sobreposicao}>
          <ScrollView
            contentContainerStyle={styles.conteudoExploracao}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.cabecalho}>
              <Image
                source={IMAGEM_MALU}
                style={styles.imagemMalu}
                resizeMode="contain"
              />

              <View style={styles.balaoMalu}>
                <Text style={styles.titulo}>
                  Painel dos pequenos mundos
                </Text>

                <Text style={styles.instrucao}>
                  Explore cada planeta anão e descubra
                  curiosidades incríveis sobre eles.
                </Text>

                <Text style={styles.progresso}>
                  Descobertas: {planetasVisitados.length}/
                  {PLANETAS_ANOES.length}
                </Text>
              </View>
            </View>

            <View style={styles.listaPlanetas}>
              {PLANETAS_ANOES.map((planeta, indice) => (
                <PlanetaFlutuante
                  key={planeta.id}
                  planeta={planeta}
                  indice={indice}
                  visitado={planetaFoiVisitado(planeta.id)}
                  selecionado={
                    planetaSelecionado?.id === planeta.id
                  }
                  aoSelecionar={selecionarPlaneta}
                />
              ))}
            </View>

            {planetaSelecionado ? (
              <View style={styles.cardCuriosidade}>
                <View style={styles.cabecalhoCuriosidade}>
                  <Image
                    source={planetaSelecionado.imagem}
                    style={styles.imagemCuriosidade}
                    resizeMode="contain"
                  />

                  <Text style={styles.nomePlaneta}>
                    {planetaSelecionado.nome}
                  </Text>
                </View>

                <Text style={styles.textoCuriosidade}>
                  {planetaSelecionado.curiosidade}
                </Text>

                <Text style={styles.mensagemMalu}>
                  Malu, exploradora espacial
                </Text>
              </View>
            ) : (
              <View style={styles.cardInicial}>
                <Text style={styles.textoInicial}>
                  Cada planeta guarda uma descoberta diferente.
                  Qual você vai explorar primeiro?
                </Text>
              </View>
            )}

            {todosForamVisitados && (
              <>
                <View style={styles.mensagemConcluida}>
                  <DistintivoAnimado
                    imagem={IMAGEM_DISTINTIVO}
                  />

                  <View style={styles.textosConclusao}>
                    <Text style={styles.tituloConcluido}>
                      Exploração concluída
                    </Text>

                    <Text style={styles.textoConcluido}>
                      Você descobriu os cinco planetas anões e
                      desbloqueou um novo distintivo.
                    </Text>
                  </View>
                </View>

                <Pressable
                  onPress={concluirExploracao}
                  style={({ pressed }) => [
                    styles.botaoContinuar,
                    pressed && styles.botaoPressionado,
                  ]}
                >
                  <Text style={styles.textoBotaoContinuar}>
                    Continuar missão
                  </Text>
                </Pressable>
              </>
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }

  if (etapa === 'desenho') {
    return (
      <MissaoDesenho
        imagemFundo={IMAGEM_FUNDO}
        imagemPersonagem={IMAGEM_MALU}
        titulo="Meu Pequeno Mundo"
        instrucao="Escolha um dos planetas anões que você conheceu e desenhe como imagina sua superfície. Você também pode criar um novo planeta anão, dar um nome a ele e inventar uma aventura. Esta atividade é opcional."
        aoConcluir={concluirDesenho}
        aoPular={concluirDesenho}
      />
    );
  }

  return (
    <MissaoDistintivo
      imagemFundo={IMAGEM_FUNDO}
      imagemDistintivo={IMAGEM_DISTINTIVO}
      titulo="Explorador dos Pequenos Mundos"
      mensagem={`Parabéns!

Você concluiu a exploração dos planetas anões do Sistema Solar.

Você conheceu Ceres, Plutão, Haumea, Makemake e Éris e descobriu que, mesmo sendo menores que os planetas, eles possuem características surpreendentes.

Agora você sabe que o Sistema Solar vai muito além dos oito planetas conhecidos.

Continue observando, investigando e fazendo novas descobertas!`}
      aoContinuar={voltarAoSistemaSolar}
    />
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
  },

  sobreposicao: {
    flex: 1,
    backgroundColor: 'rgba(4, 5, 25, 0.72)',
  },

  conteudoExploracao: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },

  cabecalho: {
    width: '100%',
    maxWidth: 900,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 16,
  },

  imagemMalu: {
    width: 90,
    height: 120,
    marginRight: -8,
    zIndex: 2,
  },

  balaoMalu: {
    flex: 1,
    maxWidth: 700,
    backgroundColor: 'rgba(20, 21, 52, 0.96)',
    borderWidth: 2,
    borderColor: '#B98BFF',
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 13,
  },

  titulo: {
    color: '#FFD86B',
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  instrucao: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 5,
  },

  progresso: {
    color: '#CFBDFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 7,
  },

  listaPlanetas: {
    width: '100%',
    maxWidth: 950,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-end',
    columnGap: 22,
    rowGap: 24,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 14,
  },

  planetaFlutuante: {
    width: 155,
    alignItems: 'center',
  },

  areaPlanetaClicavel: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 5,
    paddingTop: 4,
    paddingBottom: 8,
  },

  planetaSelecionado: {
    backgroundColor: 'rgba(126, 104, 200, 0.22)',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  planetaPressionado: {
    opacity: 0.72,
  },

  areaImagemPlaneta: {
    width: 145,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  imagemPlaneta: {
    width: '100%',
    height: '100%',
  },

  etiquetaPlaneta: {
    minWidth: 105,
    backgroundColor: 'rgba(20, 21, 52, 0.94)',
    borderWidth: 2,
    borderColor: '#7E68C8',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginTop: 5,
  },

  etiquetaPlanetaVisitado: {
    backgroundColor: 'rgba(62, 43, 120, 0.96)',
    borderColor: '#FFD86B',
  },

  nomeBotaoPlaneta: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  statusPlaneta: {
    position: 'absolute',
    top: 3,
    right: 3,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6D46D9',
    borderWidth: 2,
    borderColor: '#FFD86B',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoStatus: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  cardInicial: {
    width: '100%',
    maxWidth: 900,
    minHeight: 110,
    backgroundColor: 'rgba(17, 19, 47, 0.96)',
    borderWidth: 2,
    borderColor: '#7063A9',
    borderRadius: 22,
    padding: 22,
    marginTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoInicial: {
    color: '#FFFFFF',
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },

  cardCuriosidade: {
    width: '100%',
    maxWidth: 900,
    minHeight: 170,
    backgroundColor: 'rgba(17, 19, 47, 0.97)',
    borderWidth: 2,
    borderColor: '#B98BFF',
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 18,
    marginTop: 18,
  },

  cabecalhoCuriosidade: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imagemCuriosidade: {
    width: 70,
    height: 70,
    marginRight: 12,
  },

  nomePlaneta: {
    color: '#FFD86B',
    fontSize: 25,
    fontWeight: 'bold',
  },

  textoCuriosidade: {
    color: '#FFFFFF',
    fontSize: 17,
    lineHeight: 25,
    textAlign: 'center',
    marginTop: 10,
  },

  mensagemMalu: {
    color: '#CDBDFA',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'right',
    marginTop: 12,
  },

  mensagemConcluida: {
    width: '100%',
    maxWidth: 900,
    flexDirection: 'row',
    backgroundColor: 'rgba(67, 44, 139, 0.98)',
    borderWidth: 2,
    borderColor: '#FFD86B',
    borderRadius: 26,
    paddingHorizontal: 22,
    paddingVertical: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#FFD86B',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 10,
  },

  previaDistintivo: {
    width: 120,
    height: 120,
    marginRight: 20,
  },

  textosConclusao: {
    flex: 1,
    maxWidth: 550,
  },

  tituloConcluido: {
    color: '#FFD86B',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textoConcluido: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 6,
  },

  botaoContinuar: {
    width: '100%',
    maxWidth: 380,
    minHeight: 52,
    backgroundColor: '#623FD1',
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  botaoPressionado: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },

  textoBotaoContinuar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});