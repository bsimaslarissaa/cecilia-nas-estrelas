import MissaoAtividade from '@/components/MissaoAtividade';
import MissaoDesenho from '@/components/MissaoDesenho';
import MissaoDialogo from '@/components/MissaoDialogo';
import MissaoDistintivo from '@/components/MissaoDistintivo';
import { concluirPlaneta } from '@/constants/progresso';
import { router } from 'expo-router';
import React, { useState } from 'react';

type EtapaMissao = 'dialogo' | 'atividade' | 'desenho' | 'distintivo';

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

  Melinda: {
    explicando: require('@/assets/images/melinda.png'),
  },

  Aurora: {
    explicando: require('@/assets/images/aurora.png'),
  },

  Enrique: {
    falando: require('@/assets/images/enrique.png'),
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
      'Bip! Detectando o último planeta da nossa rota pelo Sistema Solar.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'surpresa',
    texto: 'Uau! Que azul bonito! Ele parece um enorme oceano!',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto: 'Bem-vindos a Netuno, o planeta mais distante do Sol.',
  },
  {
    nome: 'Melinda',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'A cor azul de Netuno está relacionada aos gases presentes em sua atmosfera, incluindo o metano.',
  },
  {
    nome: 'Enrique',
    lado: 'direita',
    expressao: 'falando',
    texto: 'Então ele é um planeta muito gelado?',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Sim. Netuno é um gigante gelado e possui temperaturas extremamente baixas.',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Atenção! Velocidade dos ventos registrada: mais de 2.000 quilômetros por hora.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'surpresa',
    texto: 'Mais de dois mil quilômetros por hora?',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'curiosa',
    texto: 'Como pode existir tanto vento em um planeta tão frio?',
  },
  {
    nome: 'Melinda',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Esse ainda é um dos mistérios estudados pelos cientistas. Netuno possui alguns dos ventos mais rápidos de todo o Sistema Solar.',
  },
  {
    nome: 'Enrique',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Fiz uma conta! Um ano em Netuno dura aproximadamente 165 anos terrestres.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'surpresa',
    texto:
      'Então uma pessoa poderia passar a vida inteira sem comemorar nem mesmo um aniversário em Netuno!',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Cálculo aprovado. Netuno realmente leva muito tempo para completar uma volta ao redor do Sol.',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Netuno também possui anéis. Eles são discretos, escuros e difíceis de observar.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'curiosa',
    texto: 'E ele também possui luas?',
  },
  {
    nome: 'Melinda',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Sim. Sua maior lua se chama Tritão. Ela possui gêiseres e gira ao redor de Netuno em sentido contrário ao da maioria das luas.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'alegre',
    texto:
      'Netuno parece distante, gelado e misterioso... mas também é incrível!',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Confirmação positiva. Curiosidade da tripulação detectada em nível máximo.',
  },
];

export default function MissaoNetunoScreen() {
  const [etapa, setEtapa] = useState<EtapaMissao>('dialogo');

  const concluirAtividade = () => {
    setEtapa('desenho');
  };

  const concluirDesenho = () => {
    setEtapa('distintivo');
  };

  const voltarAoSistemaSolar = () => {
    concluirPlaneta('netuno');
    router.replace('/solar-system' as any);
  };

  if (etapa === 'dialogo') {
    return (
      <MissaoDialogo
        imagemFundo={require('@/assets/images/nave-netuno.jpeg')}
        avatares={AVATARES}
        dialogos={DIALOGOS}
        aoFinalizar={() => setEtapa('atividade')}
      />
    );
  }

  if (etapa === 'atividade') {
    return (
      <MissaoAtividade
        imagemFundo={require('@/assets/images/nave-netuno.jpeg')}
        imagemPersonagem={require('@/assets/images/melinda.png')}
        imagemDistintivo={require('@/assets/images/distintivo-netuno.png')}
        cabecalho="LABORATÓRIO DA MELINDA"
        titulo="O Gigante dos Ventos"
        descricao="Melinda preparou um desafio sobre uma das características mais impressionantes de Netuno."
        pergunta="Qual destas afirmações sobre Netuno está correta?"
        dica="Lembre-se do que Cosmo registrou sobre a velocidade dos ventos desse planeta."
        opcoes={[
          'Netuno possui ventos que podem ultrapassar 2.000 quilômetros por hora.',
          'Netuno é o planeta mais próximo do Sol.',
          'Um ano em Netuno dura apenas 24 horas terrestres.',
          'Netuno não possui luas nem anéis.',
        ]}
        indiceRespostaCorreta={0}
        explicacaoResposta="Muito bem! Apesar de ser extremamente frio, Netuno possui alguns dos ventos mais rápidos do Sistema Solar, que podem ultrapassar 2.000 quilômetros por hora."
        aoConcluir={concluirAtividade}
      />
    );
  }

  if (etapa === 'desenho') {
    return (
      <MissaoDesenho
        imagemFundo={require('@/assets/images/nave-netuno.jpeg')}
        imagemPersonagem={require('@/assets/images/cecialegrecuriosa.png')}
        titulo="Pintando o Planeta Azul"
        instrucao="Desenhe Netuno e invente uma tempestade espacial. Pense nas cores, no formato e até no som que ela faria. Esta atividade é opcional."
        aoConcluir={concluirDesenho}
        aoPular={concluirDesenho}
      />
    );
  }

  return (
    <MissaoDistintivo
      imagemFundo={require('@/assets/images/nave-netuno.jpeg')}
      imagemDistintivo={require('@/assets/images/distintivo-netuno.png')}
      titulo="Explorador dos Grandes Ventos"
      mensagem={`Parabéns!

Você chegou ao planeta mais distante do Sol e concluiu a rota pelos planetas do Sistema Solar.

Você descobriu que Netuno é um gigante gelado, possui ventos extremamente velozes, anéis discretos e uma lua muito especial chamada Tritão.

Agora você faz parte da Frota Capivariana Interplanetária!

Toda descoberta é o começo de uma nova jornada.`}
      aoContinuar={voltarAoSistemaSolar}
    />
  );
}