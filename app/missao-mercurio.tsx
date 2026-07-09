import MissaoDialogo from '@/components/MissaoDialogo';

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

const DIALOGOS = [
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto: 'Bip! Rota confirmada!',
  },
  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'curiosa',
    texto: 'Nossa! Que planetinha pequeno! Será que ele guarda grandes aventuras?',
  },
  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto: 'Vamos descobrir!',
  },
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
    texto: 'Não exatamente. Mas ele gira ao redor do Sol muito mais rápido do que a Terra.',
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
    texto: 'Cada planeta tem sua própria personalidade. Mercúrio é pequeno, veloz e guarda muitos segredos sobre a formação do Sistema Solar.',
  },
  {
    nome: 'Luna',
    lado: 'direita',
    expressao: 'falando',
    texto: 'Eu queria passear por lá... mas acho que levaria roupa para todas as estações do ano no mesmo dia!',
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
    texto: 'Porque durante o dia faz um calor enorme, mas durante a noite faz um frio congelante!',
  },
  {
    nome: 'Enrique',
    lado: 'direita',
    expressao: 'falando',
    texto: 'Fiz uma continha! Um ano em Mercúrio dura apenas 88 dias terrestres. Se morássemos lá, comemoraríamos aniversário muito mais vezes!',
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
    texto: 'Informação parcialmente correta. O número de aniversários aumentaria, mas o número de bolos dependeria dos cozinheiros da nave.',
  },
];

export default function MissaoMercurioScreen() {
  return (
    <MissaoDialogo
      imagemFundo={require('@/assets/images/nave-mercurio.jpeg')}
      avatares={AVATARES}
      dialogos={DIALOGOS}
    />
  );
}