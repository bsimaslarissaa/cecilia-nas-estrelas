import MissaoDialogo from '@/components/MissaoDialogo';

const imagemFundo = require('@/assets/images/nave-venus.png');

const avatares = {
  Cosmo: {
    feliz: require('@/assets/images/cosmo.png'),
  },
  Cecília: {
    feliz: require('@/assets/images/cecifeliz.png'),
    surpresa: require('@/assets/images/cecialegrecuriosa.png'),
  },
  Aurora: {
    feliz: require('@/assets/images/aurora.png'),
  },
  Carmem: {
    feliz: require('@/assets/images/carmem.png'),
  },
};

const dialogos = [
  {
    nome: 'Cosmo',
    lado: 'esquerda',
    expressao: 'feliz',
    texto: 'Bip! Destino alcançado! Estamos diante de Vênus!',
  },
  {
    nome: 'Cecília',
    lado: 'direita',
    expressao: 'surpresa',
    texto: 'Uau! Ele é tão brilhante! Parece uma estrela!',
  },
  {
    nome: 'Aurora',
    lado: 'esquerda',
    expressao: 'feliz',
    texto: 'Muitas pessoas pensavam isso antigamente. Mas Vênus é um planeta.',
  },
  {
    nome: 'Carmem',
    lado: 'direita',
    expressao: 'feliz',
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
    expressao: 'feliz',
    texto: 'Parece... mas é muito diferente.',
  },
  {
    nome: 'Cosmo',
    lado: 'esquerda',
    expressao: 'feliz',
    texto: 'Sensores detectam temperatura superior a 460 °C.',
  },
  {
    nome: 'Cecília',
    lado: 'direita',
    expressao: 'surpresa',
    texto: 'Quatrocentos e sessenta graus??',
  },
  {
    nome: 'Carmem',
    lado: 'esquerda',
    expressao: 'feliz',
    texto: 'É tão quente que muitos materiais derreteriam por lá!',
  },
  {
    nome: 'Cecília',
    lado: 'direita',
    expressao: 'surpresa',
    texto: 'Então acho melhor fazermos essa visita bem rapidinho...',
  },
  {
    nome: 'Cosmo',
    lado: 'esquerda',
    expressao: 'feliz',
    texto: 'Recomendação aprovada.',
  },
];

export default function MissaoVenus() {
  return (
    <MissaoDialogo
      imagemFundo={imagemFundo}
      avatares={avatares}
      dialogos={dialogos}
    />
  );
}