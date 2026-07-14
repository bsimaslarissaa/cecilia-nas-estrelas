import MissaoAtividade from '@/components/MissaoAtividade';
import MissaoDialogo from '@/components/MissaoDialogo';
import MissaoDistintivo from '@/components/MissaoDistintivo';
import { router } from 'expo-router';
import React, { useState } from 'react';

type EtapaMissao = 'dialogo' | 'atividade' | 'distintivo';

const AVATARES: Record<string, Record<string, any>> = {
  Cecília: {
    aoversol: require('@/assets/images/cecisol.png'),
    curiosa: require('@/assets/images/cecicuriosa.png'),
    pensativa: require('@/assets/images/cecifeliz.png'),
    feliz: require('@/assets/images/cecialegrecuriosa.png'),
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
    expressao: 'aoversol',
    texto: 'Uau! Que clarão é esse? Parece uma enorme bola dourada!',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Sensores ativados! Estamos observando a estrela mais importante do nosso Sistema Solar.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'curiosa',
    texto: 'Espera aí... então o Sol não é um planeta?',
  },
  {
    nome: 'Melinda',
    lado: 'direita',
    expressao: 'explicando',
    texto: 'Isso mesmo! O Sol é uma estrela. Ele produz luz e calor.',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Todos os planetas giram ao redor dele. Sem o Sol, nosso planeta seria muito frio e escuro.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'pensativa',
    texto: 'Então podemos dizer que ele é o coração do Sistema Solar?',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Gostei dessa comparação! De certa forma, sim. A gravidade do Sol ajuda a manter os planetas em suas órbitas, e sua luz e seu calor tornam a vida na Terra possível.',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'feliz',
    texto: 'Que bom que nossa aventura começou por aqui!',
  },
];

export default function MissaoSolScreen() {
  const [etapa, setEtapa] = useState<EtapaMissao>('dialogo');

  const concluirAtividade = () => {
    setEtapa('distintivo');
  };

  const voltarAoSistemaSolar = () => {
    router.replace('/solar-system' as any);
  };

  if (etapa === 'dialogo') {
    return (
      <MissaoDialogo
        imagemFundo={require('@/assets/images/nave-sol.jpeg')}
        avatares={AVATARES}
        dialogos={DIALOGOS}
        aoFinalizar={() => setEtapa('atividade')}
      />
    );
  }

  if (etapa === 'atividade') {
    return (
      <MissaoAtividade
        imagemFundo={require('@/assets/images/nave-sol.jpeg')}
        imagemAtividade={require('@/assets/images/sol.png')}
        imagemDistintivo={require('@/assets/images/distintivo-sol.png')}
        titulo="Guardião da Luz"
        descricao="Mostre o que você aprendeu sobre a estrela mais importante do nosso Sistema Solar."
        pergunta="Por que o Sol é importante para a vida na Terra?"
        opcoes={[
          'Porque fornece luz e calor e ajuda a tornar a vida possível.',
          'Porque é um planeta que produz água para a Terra.',
          'Porque impede que a Terra faça movimentos no espaço.',
          'Porque é o satélite natural mais próximo da Terra.',
        ]}
        indiceRespostaCorreta={0}
        explicacaoResposta="Muito bem! O Sol fornece luz e calor para a Terra e torna a vida possível."
        aoConcluir={concluirAtividade}
      />
    );
  }

  return (
    <MissaoDistintivo
      imagemFundo={require('@/assets/images/nave-sol.jpeg')}
      imagemDistintivo={require('@/assets/images/distintivo-sol.png')}
      titulo="Guardião da Luz"
      mensagem={`Parabéns!

Você concluiu sua primeira missão espacial e descobriu por que o Sol é tão importante para a vida na Terra.

Continue explorando! Ainda existem muitos lugares incríveis esperando por você.`}
      aoContinuar={voltarAoSistemaSolar}
    />
  );
}