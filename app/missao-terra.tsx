import MissaoDialogo from '@/components/MissaoDialogo';

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
];

export default function MissaoTerraScreen() {
  return (
    <MissaoDialogo
      imagemFundo={require('@/assets/images/nave-terra.png')}
      avatares={AVATARES}
      dialogos={DIALOGOS}
    />
  );
}