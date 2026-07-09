import MissaoDialogo from '@/components/MissaoDialogo';

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

const DIALOGOS = [
  { nome: 'Cecília', lado: 'esquerda', expressao: 'aoversol', texto: 'Uau! Que clarão é esse? Parece uma enorme bola dourada!' },
  { nome: 'Cosmo', lado: 'direita', expressao: 'falando', texto: 'Sensores ativados! Estamos observando a estrela mais importante do nosso Sistema Solar.' },
  { nome: 'Cecília', lado: 'esquerda', expressao: 'curiosa', texto: 'Espera aí... então o Sol não é um planeta?' },
  { nome: 'Melinda', lado: 'direita', expressao: 'explicando', texto: 'Isso mesmo! O Sol é uma estrela. Ele produz luz e calor.' },
  { nome: 'Aurora', lado: 'direita', expressao: 'explicando', texto: 'Todos os planetas giram ao redor dele. Sem o Sol, nosso planeta seria muito frio e escuro.' },
  { nome: 'Cecília', lado: 'esquerda', expressao: 'pensativa', texto: 'Então podemos dizer que ele é o coração do Sistema Solar?' },
  { nome: 'Aurora', lado: 'direita', expressao: 'explicando', texto: 'Gostei dessa comparação! De certa forma, sim. A gravidade do Sol ajuda a manter os planetas em suas órbitas, e sua luz e seu calor tornam a vida na Terra possível.' },
  { nome: 'Cecília', lado: 'esquerda', expressao: 'feliz', texto: 'Que bom que nossa aventura começou por aqui!' },
];

export default function MissionScreen() {
  return (
    <MissaoDialogo
      imagemFundo={require('@/assets/images/nave-sol.jpeg')}
      avatares={AVATARES}
      dialogos={DIALOGOS}
    />
  );
}