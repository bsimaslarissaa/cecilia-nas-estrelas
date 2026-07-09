import MissaoDialogo from '@/components/MissaoDialogo';

type LadoPersonagem = 'esquerda' | 'direita';

const imagemFundo = require('@/assets/images/nave-venus.png');

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
  lado: LadoPersonagem;
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
    expressao: 'feliz',
    texto: 'Uau! Ele é tão brilhante! Parece uma estrela!',
  },
  {
    nome: 'Aurora',
    lado: 'direita',
    expressao: 'explicando',
    texto: 'Muitas pessoas pensavam isso antigamente. Mas Vênus é um planeta.',
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
    expressao: 'curiosa',
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
    texto: 'Quatrocentos e sessenta graus??',
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
    expressao: 'surpresa',
    texto: 'Então acho melhor fazermos essa visita bem rapidinho...',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto: 'Recomendação aprovada.',
  },
];

export default function MissaoVenusScreen() {
  return (
    <MissaoDialogo
      imagemFundo={imagemFundo}
      avatares={AVATARES}
      dialogos={DIALOGOS}
    />
  );
}