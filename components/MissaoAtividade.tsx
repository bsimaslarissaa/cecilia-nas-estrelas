import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Props = {
  imagemFundo: any;
  titulo: string;
  descricao: string;
  pergunta: string;
  placeholder?: string;
  aoConcluir: (resposta: string) => void;
};

export default function MissaoAtividade({
  imagemFundo,
  titulo,
  descricao,
  pergunta,
  placeholder = 'Digite sua resposta aqui...',
  aoConcluir,
}: Props) {
  const [resposta, setResposta] = useState('');

  const respostaValida = resposta.trim().length >= 10;

  const concluirAtividade = () => {
    if (!respostaValida) {
      return;
    }

    aoConcluir(resposta.trim());
  };

  return (
    <ImageBackground
      source={imagemFundo}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.keyboardArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Image
              source={require('@/assets/images/sol.png')}
              style={styles.iconeImagem}
              resizeMode="contain"
            />

            <Text style={styles.selo}>MISSÃO DA CECÍLIA</Text>

            <Text style={styles.titulo}>{titulo}</Text>

            <Text style={styles.descricao}>{descricao}</Text>

            <View style={styles.perguntaContainer}>
              <Text style={styles.pergunta}>{pergunta}</Text>

              <TextInput
                style={styles.campoResposta}
                placeholder={placeholder}
                placeholderTextColor="#9691B5"
                value={resposta}
                onChangeText={setResposta}
                multiline
                maxLength={300}
                textAlignVertical="top"
                returnKeyType="default"
              />

              <Text style={styles.contador}>
                {resposta.length}/300
              </Text>
            </View>

            {!respostaValida && resposta.length > 0 && (
              <Text style={styles.aviso}>
                Escreva um pouco mais para concluir a missão.
              </Text>
            )}

            <Pressable
              style={[
                styles.botao,
                !respostaValida && styles.botaoDesativado,
              ]}
              onPress={concluirAtividade}
              disabled={!respostaValida}
            >
              <Text style={styles.textoBotao}>
                Concluir missão
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  keyboardArea: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: 'rgba(3, 4, 20, 0.45)',
  },

  card: {
    width: '100%',
    maxWidth: 720,
    backgroundColor: 'rgba(15, 18, 36, 0.96)',
    borderWidth: 2,
    borderColor: '#8A6CFF',
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 22,
    alignItems: 'center',
  },

  iconeImagem: {
  width: 72,
  height: 72,
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
    marginBottom: 18,
  },

  perguntaContainer: {
    width: '100%',
  },

  pergunta: {
    color: '#FFD86B',
    fontSize: 17,
    lineHeight: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },

  campoResposta: {
    width: '100%',
    minHeight: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#17142C',
    fontSize: 16,
    lineHeight: 22,
  },

  contador: {
    color: '#A7A1C5',
    fontSize: 11,
    textAlign: 'right',
    marginTop: 5,
  },

  aviso: {
    color: '#FFBE6B',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
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
});