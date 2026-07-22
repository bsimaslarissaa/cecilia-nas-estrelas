import MissaoAtividade from '@/components/MissaoAtividade';
import MissaoDialogo from '@/components/MissaoDialogo';
import MissaoDistintivo from '@/components/MissaoDistintivo';
import { concluirPlaneta } from '@/constants/progresso';
import { router } from 'expo-router';
import React, { useState } from 'react';

type EtapaMissao = 'dialogo' | 'atividade' | 'distintivo';

const AVATARES: Record<string, Record<string, any>> = {
  Cecília: {
    feliz: require('@/assets/images/cecifeliz.png'),
    curiosa: require('@/assets/images/cecicuriosa.png'),
    alegre: require('@/assets/images/cecialegrecuriosa.png'),
  },

  Cosmo: {
    falando: require('@/assets/images/cosmo.png'),
  },

  Lucas: {
    falando: require('@/assets/images/lucas.png'),
  },

  Melinda: {
    explicando: require('@/assets/images/melinda.png'),
  },

  Téo: {
    explicando: require('@/assets/images/teo.png'),
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
    texto: 'Bip! Sensores confirmam! Estamos orbitando o planeta Terra!',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'alegre',
    texto: 'Nossa... Que planeta lindo!',
  },
  {
    nome: 'Lucas',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Lá de cima conseguimos enxergar oceanos, montanhas, florestas, desertos e enormes nuvens.',
  },
  {
    nome: 'Melinda',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Até agora conhecemos mundos muito diferentes. Mas nenhum deles possui tudo o que encontramos aqui.',
  },
  {
    nome: 'Téo',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'A Terra é cheia de montanhas, vulcões, cavernas, rios e continentes. Cada pedacinho conta uma parte da história do nosso planeta.',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto: 'Sensores detectam... vida.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'feliz',
    texto: 'Acho que esse é o lugar mais especial de toda a nossa viagem.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'curiosa',
    texto: 'Então tudo está ligado?',
  },
  {
    nome: 'Téo',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Isso mesmo. As florestas, os rios, os oceanos, os animais e até o ar que respiramos fazem parte do mesmo planeta.',
  },
  {
    nome: 'Lucas',
    lado: 'direita',
    expressao: 'falando',
    texto: 'É como uma grande equipe!',
  },
  {
    nome: 'Melinda',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Quando aprendemos a cuidar de uma parte da Terra, ajudamos todas as outras.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'alegre',
    texto:
      'Então... cuidar da Terra também é uma forma de cuidar uns dos outros.',
  },
  {
    nome: 'Lucas',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'E tenho uma curiosidade! Vista do espaço, a Terra parece uma grande esfera azul porque os oceanos cobrem a maior parte da superfície do planeta.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'curiosa',
    texto:
      'Então é por isso que os astronautas chamam a Terra de Planeta Azul!',
  },
];

export default function MissaoTerraScreen() {
  const [etapa, setEtapa] = useState<EtapaMissao>('dialogo');

  const concluirAtividade = () => {
    setEtapa('distintivo');
  };

  const voltarAoSistemaSolar = () => {
    concluirPlaneta('terra');
    router.replace('/solar-system' as any);
  };

  if (etapa === 'dialogo') {
    return (
      <MissaoDialogo
        imagemFundo={require('@/assets/images/nave-terra.png')}
        avatares={AVATARES}
        dialogos={DIALOGOS}
        aoFinalizar={() => setEtapa('atividade')}
      />
    );
  }

  if (etapa === 'atividade') {
    return (
      <MissaoAtividade
        imagemFundo={require('@/assets/images/nave-terra.png')}
        imagemPersonagem={require('@/assets/images/lucas.png')}
        imagemDistintivo={require('@/assets/images/distintivo-terra.png')}
        cabecalho="DESAFIO DO LUCAS"
        titulo="Guardião do Planeta Azul"
        descricao="Lucas preparou uma curiosidade sobre o nosso planeta. Vamos ver se você prestou atenção!"
        pergunta="Lucas explicou por que os astronautas chamam a Terra de Planeta Azul. Qual é o motivo?"
        opcoes={[
          'Porque os oceanos cobrem a maior parte da superfície da Terra.',
          'Porque o céu pinta todo o planeta de azul.',
          'Porque a Lua reflete uma luz azul sobre a Terra.',
          'Porque a Terra é feita principalmente de gelo.',
        ]}
        indiceRespostaCorreta={0}
        explicacaoResposta="Muito bem! A Terra é chamada de Planeta Azul porque cerca de 71% de sua superfície é coberta por água. Vista do espaço, os oceanos fazem nosso planeta parecer azul."
        aoConcluir={concluirAtividade}
      />
    );
  }

  return (
    <MissaoDistintivo
      imagemFundo={require('@/assets/images/nave-terra.png')}
      imagemDistintivo={require('@/assets/images/distintivo-terra.png')}
      titulo="Guardião do Planeta Azul"
      mensagem={`Parabéns!

Você conheceu melhor o planeta onde vivemos e descobriu por que ele é chamado de Planeta Azul.

Agora você já sabe que cuidar da Terra também faz parte da missão de todo explorador espacial.

Continue sua jornada! Ainda existem muitos mundos esperando por você.`}
      aoContinuar={voltarAoSistemaSolar}
    />
  );
}