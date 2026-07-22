import MissaoAtividade from '@/components/MissaoAtividade';
import MissaoDesenho from '@/components/MissaoDesenho';
import MissaoDialogo from '@/components/MissaoDialogo';
import MissaoDistintivo from '@/components/MissaoDistintivo';
import { concluirPlaneta } from '@/constants/progresso';
import { router } from 'expo-router';
import React, { useState } from 'react';

type EtapaMissao =
  | 'dialogo'
  | 'atividade'
  | 'desenho'
  | 'distintivo';

const AVATARES: Record<string, Record<string, any>> = {
  Cecília: {
    curiosa: require('@/assets/images/cecicuriosa.png'),
    feliz: require('@/assets/images/cecifeliz.png'),
    alegre: require('@/assets/images/cecialegrecuriosa.png'),
  },

  Cosmo: {
    falando: require('@/assets/images/cosmo.png'),
  },

  Tito: {
    explicando: require('@/assets/images/tito.png'),
  },

  Carmem: {
    explicando: require('@/assets/images/carmem.png'),
  },

  Aurora: {
    explicando: require('@/assets/images/aurora.png'),
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
    texto: 'Bip! Detectando um planeta gigante logo à frente!',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'curiosa',
    texto: 'Gigante? Quanto gigante?',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'alegre',
    texto: 'Uau...',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'curiosa',
    texto: 'Ele é enorme!',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto: 'Confirmação realizada. Muito enorme.',
  },
  {
    nome: 'Tito',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Júpiter é o maior planeta do Sistema Solar. Mais de mil Terras caberiam dentro dele.',
  },
  {
    nome: 'Carmem',
    lado: 'direita',
    expressao: 'explicando',
    texto: 'Nossa! Então ele deve ser muito pesado!',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'É mesmo. Sua gravidade é tão forte que influencia vários objetos do Sistema Solar.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'curiosa',
    texto: 'Então ele ajuda a proteger os outros planetas?',
  },
  {
    nome: 'Tito',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Em muitos casos, sua enorme gravidade pode alterar a trajetória de asteroides e cometas. Por isso, muitos cientistas dizem que Júpiter exerce um papel importante na dinâmica do Sistema Solar.',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto: 'Gigante... e muito interessante.',
  },
];

export default function MissaoJupiterScreen() {
  const [etapa, setEtapa] =
    useState<EtapaMissao>('dialogo');

  const concluirAtividade = () => {
    setEtapa('desenho');
  };

  const concluirDesenho = () => {
    setEtapa('distintivo');
  };

  const voltarAoSistemaSolar = () => {
    concluirPlaneta('jupiter');
    router.replace('/solar-system' as any);
  };

  if (etapa === 'dialogo') {
    return (
      <MissaoDialogo
        imagemFundo={require('@/assets/images/nave-jupiter.jpeg')}
        avatares={AVATARES}
        dialogos={DIALOGOS}
        aoFinalizar={() => setEtapa('atividade')}
      />
    );
  }

  if (etapa === 'atividade') {
    return (
      <MissaoAtividade
        imagemFundo={require('@/assets/images/nave-jupiter.jpeg')}
        imagemPersonagem={require('@/assets/images/tito.png')}
        imagemDistintivo={require('@/assets/images/distintivo-jupiter.png')}
        cabecalho="LABORATÓRIO DO TITO"
        titulo="O Gigante Gentil"
        descricao="Tito preparou um desafio sobre as características que tornam Júpiter o planeta mais massivo de todos."
        pergunta="Júpiter é um gigante gasoso muito especial. Quantas Terras caberiam aproximadamente dentro dele?"
        opcoes={[
          'Mais de mil Terras.',
          'Apenas duas Terras.',
          'Cerca de cinquenta Terras.',
          'Nenhuma, ele tem o mesmo tamanho da Terra.',
        ]}
        indiceRespostaCorreta={0}
        explicacaoResposta="Incrível! Júpiter é tão massivo que mais de mil planetas Terra caberiam inteiramente dentro do seu espaço gasoso."
        aoConcluir={concluirAtividade}
      />
    );
  }

  if (etapa === 'desenho') {
    return (
      <MissaoDesenho
        imagemFundo={require('@/assets/images/nave-jupiter.jpeg')}
        imagemPersonagem={require('@/assets/images/cecialegrecuriosa.png')}
        titulo="Tempestades Gigantes"
        instrucao="Desenhe a Grande Mancha Vermelha de Júpiter. Você também pode inventar uma tempestade espacial, criar um nome para ela e imaginar como seriam suas nuvens coloridas."
        aoConcluir={concluirDesenho}
        aoPular={concluirDesenho}
      />
    );
  }

  return (
    <MissaoDistintivo
      imagemFundo={require('@/assets/images/nave-jupiter.jpeg')}
      imagemDistintivo={require('@/assets/images/distintivo-jupiter.png')}
      titulo="Guardião do Gigante Gentil"
      mensagem={`Parabéns!

Você explorou Júpiter e descobriu por que ele é chamado de Gigante Gentil do nosso Sistema Solar.

Também aprendeu sobre sua atmosfera de gás e como sua gravidade ajuda a proteger nossa vizinhança espacial.

Continue sua jornada! Ainda restam mundos fantásticos para mapear.`}
      aoContinuar={voltarAoSistemaSolar}
    />
  );
}