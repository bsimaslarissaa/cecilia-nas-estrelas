import MissaoAtividade from '@/components/MissaoAtividade';
import MissaoDialogo from '@/components/MissaoDialogo';
import MissaoDistintivo from '@/components/MissaoDistintivo';
import { concluirPlaneta } from '@/constants/progresso';
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

  Luna: {
    explicando: require('@/assets/images/luna.png'),
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
    texto: 'Bip! Estamos entrando na órbita de Marte.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'alegre',
    texto: 'Ele realmente é vermelho!',
  },
  {
    nome: 'Luna',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Essa cor vem de um mineral chamado óxido de ferro, parecido com a ferrugem que aparece em alguns metais.',
  },
  {
    nome: 'Nuri',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Foi justamente essa cor que fez muitas pessoas imaginarem histórias sobre Marte durante milhares de anos.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'curiosa',
    texto: 'Você mora aqui?',
  },
  {
    nome: 'Nuri',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      '(ri) Não! O Universo é muito maior do que isso. Eu também adoro descobrir planetas novos.',
  },
  {
    nome: 'Luna',
    lado: 'direita',
    expressao: 'explicando',
    texto: 'Então você também está aprendendo?',
  },
  {
    nome: 'Nuri',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Claro! Explorar o Universo significa nunca parar de fazer perguntas.',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Perguntas registradas. Curiosidade detectada em nível máximo.',
  },
  {
    nome: 'Luna',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Marte é um dos planetas mais estudados pelos cientistas. Há muito tempo, ele possuía rios, lagos e talvez até oceanos.',
  },
  {
    nome: 'Luna',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Hoje Marte é um planeta frio e seco, mas os cientistas continuam procurando sinais de que algum tipo de vida possa ter existido por lá.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'curiosa',
    texto:
      'Então Marte ainda guarda muitas perguntas esperando por respostas!',
  },
  {
    nome: 'Nuri',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Exatamente! Explorar também significa ter coragem para perguntar e descobrir.',
  },
];

export default function MissaoMarteScreen() {
  const [etapa, setEtapa] = useState<EtapaMissao>('dialogo');

  const concluirAtividade = () => {
    setEtapa('distintivo');
  };

  const voltarAoSistemaSolar = () => {
    concluirPlaneta('marte');
    router.replace('/solar-system' as any);
  };

  if (etapa === 'dialogo') {
    return (
      <MissaoDialogo
        imagemFundo={require('@/assets/images/nave-marte.png')}
        avatares={AVATARES}
        dialogos={DIALOGOS}
        aoFinalizar={() => setEtapa('atividade')}
      />
    );
  }

  if (etapa === 'atividade') {
    return (
      <MissaoAtividade
        imagemFundo={require('@/assets/images/nave-marte.png')}
        imagemPersonagem={require('@/assets/images/luna.png')}
        imagemDistintivo={require('@/assets/images/distintivo-marte.png')}
        cabecalho="DESAFIO DA LUNA"
        titulo="Explorador do Planeta Vermelho"
        descricao="Luna preparou uma pergunta sobre a característica mais conhecida de Marte."
        pergunta="Por que Marte é conhecido como Planeta Vermelho?"
        opcoes={[
          'Porque sua superfície possui óxido de ferro, semelhante à ferrugem.',
          'Porque Marte recebe uma luz vermelha enviada pelo Sol.',
          'Porque todo o planeta é coberto por lava quente.',
          'Porque sua atmosfera é formada apenas por nuvens vermelhas.',
        ]}
        indiceRespostaCorreta={0}
        explicacaoResposta="Muito bem! Marte parece vermelho porque sua superfície possui óxido de ferro, um mineral semelhante à ferrugem encontrada em alguns metais."
        aoConcluir={concluirAtividade}
      />
    );
  }

  return (
    <MissaoDistintivo
      imagemFundo={require('@/assets/images/nave-marte.png')}
      imagemDistintivo={require('@/assets/images/distintivo-marte.png')}
      titulo="Explorador do Planeta Vermelho"
      mensagem={`Parabéns!

Você conheceu Marte e descobriu por que ele é chamado de Planeta Vermelho.

Também aprendeu que fazer perguntas é uma parte muito importante da ciência.

Continue sua jornada! O Universo ainda guarda muitos mistérios.`}
      aoContinuar={voltarAoSistemaSolar}
    />
  );
}