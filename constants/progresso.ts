let planetasConcluidos: string[] = [];

const ouvintes = new Set<() => void>();

export function obterPlanetasConcluidos(): string[] {
  return [...planetasConcluidos];
}

export function concluirPlaneta(planeta: string): void {
  if (planetasConcluidos.includes(planeta)) {
    return;
  }

  planetasConcluidos = [...planetasConcluidos, planeta];

  ouvintes.forEach((ouvinte) => ouvinte());
}

export function planetaEstaConcluido(planeta: string): boolean {
  return planetasConcluidos.includes(planeta);
}

export function assinarProgresso(ouvinte: () => void): () => void {
  ouvintes.add(ouvinte);

  return () => {
    ouvintes.delete(ouvinte);
  };
}
