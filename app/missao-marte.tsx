import MissaoDialogo from '@/components/MissaoDialogo';

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
    expressao: 'curiosa',
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
      'Marte é um dos planetas mais estudados pelos cientistas.',
  },

  {
    nome: 'Luna',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Há muito tempo, ele possuía rios, lagos e talvez até oceanos. Hoje é um planeta frio e seco.',
  },

  {
    nome: 'Luna',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Mesmo assim, os cientistas continuam procurando sinais que possam mostrar se algum tipo de vida existiu por lá há bilhões de anos.',
  },

  {
    nome: 'Luna',
    lado: 'direita',
    expressao: 'explicando',
    texto:
      'Cada nova descoberta ajuda a compreender melhor não apenas Marte, mas também a história da Terra.',
  },

  {
    nome: 'Cecília',
    lado: 'esquerda',
    expressao: 'alegre',
    texto:
      'Então fazer perguntas também faz parte de ser uma exploradora espacial!',
  },

  {
    nome: 'Cosmo',
    lado: 'direita',
    expressao: 'falando',
    texto:
      'Confirmação registrada! Missão Marte concluída com sucesso!',
  },
];

export default function MissaoMarteScreen() {
  return (
    <MissaoDialogo
      imagemFundo={require('@/assets/images/nave-marte.png')}
      avatares={AVATARES}
      dialogos={DIALOGOS}
    />
  );
}