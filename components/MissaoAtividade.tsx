import React, { useMemo, useState } from 'react';
import {
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
  imagemAtividade?: any;
  imagemDistintivo: any;
  imagemPersonagem?: any;
  cabecalho?: string;
  titulo: string;
  descricao: string;
  pergunta: string;
  dica?: string;
  opcoes: string[];
  indiceRespostaCorreta: number;
  explicacaoResposta?: string;
  aoConcluir: () => void;
};

type OpcaoEmbaralhada = {
  texto: string;
  correta: boolean;
};

export default function MissaoAtividade({
  imagemFundo,
  imagemAtividade,
  imagemDistintivo,
  imagemPersonagem,
  cabecalho = 'MISSÃO DA CECÍLIA',
  titulo,
  descricao,
  pergunta,
  dica,
  opcoes,
  indiceRespostaCorreta,
  explicacaoResposta = 'Muito bem! Você encontrou a resposta correta.',
  aoConcluir,
}: Props) {
  const opcoesEmbaralhadas = useMemo<OpcaoEmbaralhada[]>(() => {
    const opcoesComResposta = opcoes.map((opcao, indice) => ({
      texto: opcao,
      correta: indice === indiceRespostaCorreta,
    }));

    return [...opcoesComResposta].sort(() => Math.random() - 0.5);
  }, [opcoes, indiceRespostaCorreta]);

  const [opcaoSelecionada, setOpcaoSelecionada] =
    useState<number | null>(null);

  const [mensagem, setMensagem] = useState('');
  const [acertou, setAcertou] = useState(false);

  const selecionarOpcao = (indice: number) => {
    setOpcaoSelecionada(indice);
    setMensagem('');
    setAcertou(false);
  };

  const verificarResposta = () => {
    if (opcaoSelecionada === null) {
      setMensagem('Escolha uma alternativa antes de continuar.');
      return;
    }

    const respostaSelecionada =
      opcoesEmbaralhadas[opcaoSelecionada];

    if (respostaSelecionada.correta) {
      setAcertou(true);
      setMensagem(explicacaoResposta);
      return;
    }

    setAcertou(false);
    setMensagem(
      'Quase! Essa não é a resposta correta. Tente novamente.'
    );
  };

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
        <View style={styles.card}>
          {imagemPersonagem && (
            <Image
              source={imagemPersonagem}
              style={styles.imagemPersonagem}
              resizeMode="contain"
            />
          )}

          {imagemAtividade && (
            <Image
              source={imagemAtividade}
              style={styles.imagemAtividade}
              resizeMode="contain"
            />
          )}

          <Text style={styles.selo}>{cabecalho}</Text>

          <Text style={styles.titulo}>{titulo}</Text>

          <Text style={styles.descricao}>{descricao}</Text>

          <Text style={styles.pergunta}>{pergunta}</Text>

          {dica && (
            <View style={styles.dicaContainer}>
              <Text style={styles.dicaTexto}>{dica}</Text>
            </View>
          )}

          <View style={styles.opcoesContainer}>
            {opcoesEmbaralhadas.map((opcao, indice) => {
              const selecionada =
                opcaoSelecionada === indice;

              return (
                <Pressable
                  key={`${opcao.texto}-${indice}`}
                  style={[
                    styles.opcao,
                    selecionada && styles.opcaoSelecionada,
                  ]}
                  onPress={() => selecionarOpcao(indice)}
                >
                  <View
                    style={[
                      styles.marcador,
                      selecionada &&
                        styles.marcadorSelecionado,
                    ]}
                  />

                  <Text
                    style={[
                      styles.textoOpcao,
                      selecionada &&
                        styles.textoOpcaoSelecionada,
                    ]}
                  >
                    {opcao.texto}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {mensagem !== '' && (
            <Text
              style={[
                styles.mensagem,
                acertou
                  ? styles.mensagemCorreta
                  : styles.mensagemErro,
              ]}
            >
              {mensagem}
            </Text>
          )}

          {!acertou ? (
            <Pressable
              style={styles.botao}
              onPress={verificarResposta}
            >
              <Text style={styles.textoBotao}>
                Verificar resposta
              </Text>
            </Pressable>
          ) : (
            <View style={styles.recompensaContainer}>
              <Text style={styles.textoConquista}>
                Você desbloqueou um novo distintivo!
              </Text>

              <Image
                source={imagemDistintivo}
                style={styles.imagemRecompensa}
                resizeMode="contain"
              />

              <Text style={styles.nomeDistintivo}>
                {titulo}
              </Text>

              <Pressable
                style={[styles.botao, styles.botaoConcluir]}
                onPress={aoConcluir}
              >
                <Text style={styles.textoBotao}>
                  Receber distintivo
                </Text>
              </Pressable>
            </View>
          )}
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

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 28,
    backgroundColor: 'rgba(3, 4, 20, 0.5)',
  },

  card: {
    width: '100%',
    maxWidth: 720,
    backgroundColor: 'rgba(15, 18, 36, 0.97)',
    borderWidth: 2,
    borderColor: '#8A6CFF',
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 22,
    alignItems: 'center',
  },

  imagemPersonagem: {
    width: 110,
    height: 130,
    marginBottom: 4,
  },

  imagemAtividade: {
    width: 78,
    height: 78,
    marginBottom: 8,
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
    marginTop: 6,
  },

  descricao: {
    color: '#E8E6F4',
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 16,
  },

  pergunta: {
    color: '#FFD86B',
    fontSize: 18,
    lineHeight: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },

  dicaContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 216, 107, 0.12)',
    borderWidth: 1,
    borderColor: '#FFD86B',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },

  dicaTexto: {
    color: '#FFF2B9',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '600',
  },

  opcoesContainer: {
    width: '100%',
    gap: 10,
  },

  opcao: {
    width: '100%',
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25213F',
    borderWidth: 2,
    borderColor: '#504A70',
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  opcaoSelecionada: {
    borderColor: '#8A6CFF',
    backgroundColor: '#352B61',
  },

  marcador: {
    width: 19,
    height: 19,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#B8B1D5',
    marginRight: 12,
  },

  marcadorSelecionado: {
    borderWidth: 5,
    borderColor: '#B78DFF',
    backgroundColor: '#FFFFFF',
  },

  textoOpcao: {
    flex: 1,
    color: '#E8E6F4',
    fontSize: 15,
    lineHeight: 21,
  },

  textoOpcaoSelecionada: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  mensagem: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },

  mensagemCorreta: {
    color: '#83F5A5',
  },

  mensagemErro: {
    color: '#FFBE6B',
  },

  recompensaContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 18,
  },

  textoConquista: {
    color: '#FFD86B',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  imagemRecompensa: {
    width: 180,
    height: 180,
  },

  nomeDistintivo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },

  botao: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#5C38D6',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 18,

    shadowColor: '#8A6CFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },

  botaoConcluir: {
    backgroundColor: '#3C8E5A',
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});