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
    curiosa: require('@/assets/images/cecicuriosa.png'),
    pensativa: require('@/assets/images/cecifeliz.png'),
    feliz: require('@/assets/images/cecialegrecuriosa.png'),
  },

  Cosmo: {
    falando: require('@/assets/images/cosmo.png'),
  },

  Tito: {
    falando: require('@/assets/images/tito.png'),
  },

  Luna: {
    falando: require('@/assets/images/luna.png'),
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
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'curiosa',
    texto: 'Cosmo! Acho que vi Mercúrio passando correndo!',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto: 'Probabilidade de ilusão detectada.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'pensativa',
    texto: 'Então ele não corre?',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Não exatamente. Mas ele gira ao redor do Sol muito mais rápido do que a Terra.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'feliz',
    texto: 'Então ele é o corredor do Sistema Solar?',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto: 'Cálculo aprovado!',
  },
  {
    nome: 'Tito',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Cada planeta tem sua própria personalidade. Mercúrio é pequeno, veloz e guarda muitos segredos sobre a formação do Sistema Solar.',
  },
  {
    nome: 'Luna',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Eu queria passear por lá... mas acho que levaria roupa para todas as estações do ano no mesmo dia!',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'curiosa',
    texto: 'Por quê?',
  },
  {
    nome: 'Luna',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Porque durante o dia faz um calor enorme, mas durante a noite faz um frio congelante!',
  },
  {
    nome: 'Enrique',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Fiz uma continha! Um ano em Mercúrio dura apenas 88 dias terrestres. Se morássemos lá, comemoraríamos aniversário muito mais vezes!',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'feliz',
    texto: 'Uau! Eu ia ganhar um monte de bolo!',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Informação parcialmente correta. O número de aniversários aumentaria, mas o número de bolos dependeria dos cozinheiros da nave.',
  },
];

export default function MissaoMercurioScreen() {
  const [etapa, setEtapa] = useState<EtapaMissao>('dialogo');

  const concluirAtividade = () => {
    setEtapa('desenho');
  };

  const concluirDesenho = () => {
    setEtapa('distintivo');
  };

  const voltarAoSistemaSolar = () => {
    concluirPlaneta('mercurio');
    router.replace('/solar-system' as any);
  };

  if (etapa === 'dialogo') {
    return (
      <MissaoDialogo
        imagemFundo={require('@/assets/images/nave-mercurio.jpeg')}
        avatares={AVATARES}
        dialogos={DIALOGOS}
        aoFinalizar={() => setEtapa('atividade')}
      />
    );
  }

  if (etapa === 'atividade') {
    return (
      <MissaoAtividade
        imagemFundo={require('@/assets/images/nave-mercurio.jpeg')}
        imagemDistintivo={require('@/assets/images/distintivo-mercurio.png')}
        imagemPersonagem={require('@/assets/images/enrique.png')}
        cabecalho="DESAFIO DO ENRIQUE"
        titulo="Explorador Veloz"
        descricao="Hora do Desafio Matemático do Enrique!"
        pergunta="Se um ano em Mercúrio dura 88 dias terrestres, aproximadamente quantos aniversários você comemoraria lá durante um ano na Terra?"
        dica="Um ano terrestre possui aproximadamente 365 dias. Faça 365 ÷ 88."
        opcoes={[
          '2 aniversários',
          '4 aniversários',
          '8 aniversários',
          '12 aniversários',
        ]}
        indiceRespostaCorreta={1}
        explicacaoResposta="Muito bem! 365 dividido por 88 é aproximadamente 4. Portanto, durante um ano na Terra, você comemoraria cerca de 4 aniversários em Mercúrio!"
        aoConcluir={concluirAtividade}
      />
    );
  }

  if (etapa === 'desenho') {
    return (
      <MissaoDesenho
        imagemFundo={require('@/assets/images/nave-mercurio.jpeg')}
        imagemPersonagem={require('@/assets/images/cecialegrecuriosa.png')}
        titulo="Corrida Espacial em Mercúrio"
        instrucao="Imagine que você está caminhando em Mercúrio. Desenhe como seria explorar um planeta muito quente durante o dia e congelante durante a noite. Esta atividade é opcional."
        aoConcluir={concluirDesenho}
        aoPular={concluirDesenho}
      />
    );
  }

  return (
    <MissaoDistintivo
      imagemFundo={require('@/assets/images/nave-mercurio.jpeg')}
      imagemDistintivo={require('@/assets/images/distintivo-mercurio.png')}
      titulo="Explorador Veloz"
      mensagem={`Parabéns!

Você conheceu o menor planeta do Sistema Solar e resolveu o Desafio Matemático do Enrique.

Agora você sabe que um ano em Mercúrio dura apenas 88 dias terrestres e que sua temperatura muda muito entre o dia e a noite.

Continue sua viagem! Ainda há muitos mundos esperando por você.`}
      aoContinuar={voltarAoSistemaSolar}
    />
  );
}