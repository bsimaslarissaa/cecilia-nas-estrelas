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
    texto: 'Bip! Detectando um gigante gelado logo à frente.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'curiosa',
    texto: 'Ele parece diferente...',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto: 'Você tem razão. Urano é um planeta muito especial.',
  },
  {
    nome: 'Enrique',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'O computador está dizendo que ele gira... deitado? Isso está certo?',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto: 'Informação correta. Inclinação aproximada: 98 graus.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'surpresa',
    texto: 'Então Urano realmente gira quase de lado!',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'curiosa',
    texto: 'Mas como um planeta ficou desse jeito?',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Os cientistas acreditam que, há bilhões de anos, Urano pode ter sofrido uma enorme colisão. Isso provavelmente mudou sua inclinação.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'feliz',
    texto: 'Então ele não está errado. Ele apenas ficou diferente.',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Exatamente. E é justamente essa diferença que torna Urano tão interessante.',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto: 'Diferenças detectadas. Curiosidade aumentada.',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Urano é um dos gigantes gelados do Sistema Solar. Ele possui temperaturas extremamente baixas.',
  },
  {
    nome: 'Enrique',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Se Urano gira de lado, como seriam as estações do ano por lá?',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Muito diferentes das nossas! Cada polo pode passar cerca de 42 anos recebendo a luz do Sol e outros 42 anos praticamente no escuro.',
  },
  {
    nome: 'Enrique',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Então um verão em Urano pode durar mais do que a vida inteira de uma criança!',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'alegre',
    texto:
      'Urano mostra que fazer as coisas de um jeito diferente também pode ser incrível!',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Conclusão registrada: as diferenças tornam o Universo mais interessante.',
  },
];

export default function MissaoUranoScreen() {
  const [etapa, setEtapa] = useState<EtapaMissao>('dialogo');

  const concluirAtividade = () => {
    setEtapa('desenho');
  };

  const concluirDesenho = () => {
    setEtapa('distintivo');
  };

  const voltarAoSistemaSolar = () => {
    concluirPlaneta('urano');
    router.replace('/solar-system' as any);
  };

  if (etapa === 'dialogo') {
    return (
      <MissaoDialogo
        imagemFundo={require('@/assets/images/nave-urano.jpeg')}
        avatares={AVATARES}
        dialogos={DIALOGOS}
        aoFinalizar={() => setEtapa('atividade')}
      />
    );
  }

  if (etapa === 'atividade') {
    return (
      <MissaoAtividade
        imagemFundo={require('@/assets/images/nave-urano.jpeg')}
        imagemPersonagem={require('@/assets/images/aurora.png')}
        imagemDistintivo={require('@/assets/images/distintivo-urano.png')}
        cabecalho="LABORATÓRIO DA AURORA"
        titulo="O Gigante que Gira de Lado"
        descricao="Aurora preparou um desafio sobre a característica mais diferente de Urano."
        pergunta="Por que Urano parece girar deitado?"
        dica="Lembre-se do que Aurora explicou sobre o eixo de rotação do planeta."
        opcoes={[
          'Porque seu eixo de rotação possui uma inclinação de aproximadamente 98 graus.',
          'Porque Urano não realiza o movimento de rotação.',
          'Porque seus anéis empurram o planeta para o lado.',
          'Porque o vento faz Urano mudar de posição todos os dias.',
        ]}
        indiceRespostaCorreta={0}
        explicacaoResposta="Muito bem! O eixo de rotação de Urano possui uma inclinação de aproximadamente 98 graus. Por isso, enquanto a maioria dos planetas gira quase em pé, Urano parece girar deitado."
        aoConcluir={concluirAtividade}
      />
    );
  }

  if (etapa === 'desenho') {
    return (
      <MissaoDesenho
        imagemFundo={require('@/assets/images/nave-urano.jpeg')}
        imagemPersonagem={require('@/assets/images/cecialegrecuriosa.png')}
        titulo="Um Novo Jeito de Ver o Mundo"
        instrucao="Desenhe Urano e imagine o planeta girando quase deitado. Você também pode desenhar seus anéis e depois observar seu desenho de lado. Esta atividade é opcional."
        aoConcluir={concluirDesenho}
        aoPular={concluirDesenho}
      />
    );
  }

  return (
    <MissaoDistintivo
      imagemFundo={require('@/assets/images/nave-urano.jpeg')}
      imagemDistintivo={require('@/assets/images/distintivo-urano.png')}
      titulo="Explorador do Gigante Inclinado"
      mensagem={`Parabéns!

Você conheceu um dos planetas mais curiosos do Sistema Solar e descobriu por que Urano parece girar deitado.

Você também aprendeu que ser diferente não significa estar errado. Cada planeta e cada pessoa possuem uma história única para contar.

As diferenças tornam o Universo mais bonito!

Prepare-se! Cosmo está detectando fortes ventos à frente. Nossa próxima parada é Netuno.`}
      aoContinuar={voltarAoSistemaSolar}
    />
  );
}