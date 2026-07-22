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
    feliz: require('@/assets/images/cecifeliz.png'),
    surpresa: require('@/assets/images/cecialegrecuriosa.png'),
    curiosa: require('@/assets/images/cecicuriosa.png'),
  },

  Cosmo: {
    falando: require('@/assets/images/cosmo.png'),
  },

  Aurora: {
    explicando: require('@/assets/images/aurora.png'),
  },

  Carmem: {
    explicando: require('@/assets/images/carmem.png'),
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
    texto: 'Bip! Destino alcançado! Estamos diante de Vênus!',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'surpresa',
    texto: 'Uau! Ele é tão brilhante! Parece uma estrela!',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Muitas pessoas pensavam isso antigamente. Mas Vênus é um planeta.',
  },
  {
    nome: 'Carmem',
    lado: 'direita',
    expressao: 'explicando',
    texto: 'E sabia que ele é quase do mesmo tamanho da Terra?',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'feliz',
    texto: 'Então ele deve ser parecido com o nosso planeta!',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto: 'Parece... mas é muito diferente.',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto: 'Sensores detectam temperatura superior a 460 °C.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'surpresa',
    texto: 'Quatrocentos e sessenta graus?',
  },
  {
    nome: 'Carmem',
    lado: 'direita',
    expressao: 'explicando',
    texto: 'É tão quente que muitos materiais derreteriam por lá!',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'curiosa',
    texto: 'Então acho melhor fazermos essa visita bem rapidinho...',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto: 'Recomendação aprovada.',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Antes de seguirmos viagem, tenho mais uma curiosidade! Em Vênus, um dia dura cerca de 243 dias terrestres, mas um ano dura aproximadamente 225 dias.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'surpresa',
    texto:
      'Nossa! Então um dia em Vênus dura mais do que um ano! Agora entendi por que ele é um planeta tão diferente.',
  },
];

export default function MissaoVenusScreen() {
  const [etapa, setEtapa] =
    useState<EtapaMissao>('dialogo');

  const concluirAtividade = () => {
    setEtapa('desenho');
  };

  const concluirDesenho = () => {
    setEtapa('distintivo');
  };

  const voltarAoSistemaSolar = () => {
    concluirPlaneta('venus');
    router.replace('/solar-system' as any);
  };

  if (etapa === 'dialogo') {
    return (
      <MissaoDialogo
        imagemFundo={require('@/assets/images/nave-venus.png')}
        avatares={AVATARES}
        dialogos={DIALOGOS}
        aoFinalizar={() => setEtapa('atividade')}
      />
    );
  }

  if (etapa === 'atividade') {
    return (
      <MissaoAtividade
        imagemFundo={require('@/assets/images/nave-venus.png')}
        imagemPersonagem={require('@/assets/images/aurora.png')}
        imagemDistintivo={require('@/assets/images/distintivo-venus.png')}
        cabecalho="DESAFIO DA AURORA"
        titulo="Explorador das Nuvens de Vênus"
        descricao="Aurora trouxe uma curiosidade sobre o movimento de Vênus. Mostre o que você aprendeu!"
        pergunta="Qual destas curiosidades sobre Vênus está correta?"
        dica="Compare o tempo que Vênus leva para girar sobre si mesmo com o tempo necessário para completar uma volta ao redor do Sol."
        opcoes={[
          'Em Vênus, um dia dura mais do que um ano.',
          'Vênus completa uma rotação em apenas 24 horas.',
          'Vênus é o planeta mais frio do Sistema Solar.',
          'Vênus possui grandes oceanos de água líquida.',
        ]}
        indiceRespostaCorreta={0}
        explicacaoResposta="Muito bem! Vênus leva cerca de 243 dias terrestres para girar sobre si mesmo, mas aproximadamente 225 dias para completar uma volta ao redor do Sol. Por isso, um dia em Vênus dura mais do que um ano!"
        aoConcluir={concluirAtividade}
      />
    );
  }

  if (etapa === 'desenho') {
    return (
      <MissaoDesenho
        imagemFundo={require('@/assets/images/nave-venus.png')}
        imagemPersonagem={require('@/assets/images/cecialegrecuriosa.png')}
        titulo="Uma Aventura em Vênus"
        instrucao="Imagine que sua nave conseguiu pousar em um lugar totalmente seguro em Vênus. Desenhe o que você encontraria: vulcões, nuvens gigantes, rochas diferentes ou qualquer outro mistério desse planeta."
        aoConcluir={concluirDesenho}
        aoPular={concluirDesenho}
      />
    );
  }

  return (
    <MissaoDistintivo
      imagemFundo={require('@/assets/images/nave-venus.png')}
      imagemDistintivo={require('@/assets/images/distintivo-venus.png')}
      titulo="Explorador das Nuvens de Vênus"
      mensagem={`Parabéns!

Você descobriu que Vênus, mesmo sendo chamado de planeta irmão da Terra, possui características muito diferentes e surpreendentes.

Você também aprendeu que um dia em Vênus dura mais do que um ano!

Continue sua jornada. O Universo ainda reserva muitas descobertas.`}
      aoContinuar={voltarAoSistemaSolar}
    />
  );
}