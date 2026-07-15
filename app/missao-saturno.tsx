import { planetasConcluidos } from '@/app/progresso';
import MissaoAtividade from '@/components/MissaoAtividade';
import MissaoDialogo from '@/components/MissaoDialogo';
import MissaoDistintivo from '@/components/MissaoDistintivo';
import { router } from 'expo-router';
import React, { useState } from 'react';

type EtapaMissao = 'dialogo' | 'atividade' | 'distintivo';

const AVATARES: Record<string, Record<string, any>> = {
  Cecília: {
    curiosa: require('@/assets/images/cecicuriosa.png'),
    feliz: require('@/assets/images/cecifeliz.png'),
    alegre: require('@/assets/images/cecialegrecuriosa.png'),
  },
  Cosmo: {
    falando: require('@/assets/images/cosmo.png'),
  },
  Lucas: {
    falando: require('@/assets/images/lucas.png'),
  },
  Aurora: {
    explicando: require('@/assets/images/aurora.png'),
  },
  Nuri: {
    explicando: require('@/assets/images/nuri.png'),
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
    texto: 'Bip! Detectando um planeta cercado por anéis.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'alegre',
    texto: 'Eu sabia! Ele realmente tem anéis!',
  },
  {
    nome: 'Lucas',
    lado: 'direita',
    expressao: 'falando',
    texto: 'Eles parecem feitos de luz.',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto: 'Na verdade, são bilhões de pedacinhos de gelo, poeira e pequenas rochas.',
  },
  {
    nome: 'Nuri',
    lado: 'direita',
    expressao: 'explicando',
    texto: 'Então... os anéis não são uma peça só?',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto: 'Não. Cada fragmento viaja ao redor de Saturno. Juntos, eles formam um espetáculo incrível.',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto: 'Confirmando. Beleza detectada em nível máximo.',
  },
];

export default function MissaoSaturnoScreen() {
  const [etapa, setEtapa] = useState<EtapaMissao>('dialogo');

  const concluirAtividade = () => {
    setEtapa('distintivo');
  };

  const voltarAoSistemaSolar = () => {
    if (!planetasConcluidos.includes('saturno')) {
      planetasConcluidos.push('saturno');
    }
    router.replace('/solar-system' as any);
  };

  if (etapa === 'dialogo') {
    return (
      <MissaoDialogo
        imagemFundo={require('@/assets/images/saturno-nave.jpeg')}
        avatares={AVATARES}
        dialogos={DIALOGOS}
        aoFinalizar={() => setEtapa('atividade')}
      />
    );
  }

  if (etapa === 'atividade') {
    return (
      <MissaoAtividade
        imagemFundo={require('@/assets/images/saturno-nave.jpeg')}
        imagemPersonagem={require('@/assets/images/lucas.png')}
        imagemDistintivo={require('@/assets/images/distintivo-saturno.png')}
        cabecalho="CURIOSIDADE DO LUCAS"
        titulo="O Planeta que Flutua"
        descricao="Lucas tem uma dúvida muito divertida sobre o peso e a densidade de Saturno."
        pergunta="O que aconteceria com Saturno se pudéssemos colocá-lo dentro de uma banheira gigante cheia de água?"
        opcoes={[
          'Ele flutuaria na água, porque sua densidade é menor que a da água.',
          'Ele afundaria imediatamente, por ser muito grande.',
          'Ele derreteria e viraria fumaça vermelha.',
          'Ele começaria a girar e jogaria água para fora do espaço.',
        ]}
        indiceRespostaCorreta={0}
        explicacaoResposta="Isso mesmo! Saturno é um gigante gasoso muito leve para o tamanho dele. Se existisse uma banheira gigante o suficiente, ele flutuaria na água porque sua densidade é menor que a da água!"
        aoConcluir={concluirAtividade}
      />
    );
  }

  return (
    <MissaoDistintivo
      imagemFundo={require('@/assets/images/saturno-nave.jpeg')}
      imagemDistintivo={require('@/assets/images/distintivo-saturno.png')}
      titulo="Senhor dos Anéis"
      mensagem={`Parabéns!

Você explorou Saturno, conheceu suas incríveis luas geladas e descobriu que a beleza também pode nascer da união de pequenas partes.

Como o Nuri disse, grandes belezas nascem quando muitas pequenas partes trabalham em harmonia!

Prepare-se! Um planeta azul-esverdeado e muito curioso está surgindo na janela...`}
      aoContinuar={voltarAoSistemaSolar}
    />
  );
}