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
  const [resposta, setResposta] = useState('');

  const concluirAtividade = (respostaDaCrianca: string) => {
    setResposta(respostaDaCrianca);
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
        titulo="Guardião da Luz"
        descricao="Agora é a sua vez de mostrar o que aprendeu sobre o Sol."
        pergunta="Por que o Sol é importante para a vida na Terra?"
        placeholder="Escreva sua resposta aqui..."
        aoConcluir={concluirAtividade}
      />
    );
  }

  return (
    <MissaoDistintivo
      imagemFundo={require('@/assets/images/nave-sol.jpeg')}
      imagemDistintivo={require('@/assets/images/distintivo-sol.png')}
      titulo="Guardião da Luz"
      mensagem={`Você concluiu sua primeira missão espacial!

Sua resposta foi:
“${resposta}”

Continue explorando! Ainda existem muitos lugares incríveis esperando por você.`}
      aoContinuar={voltarAoSistemaSolar}
    />
  );
}