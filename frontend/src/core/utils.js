// Converte string de data (yyyy-mm-dd) em Date (UTC)
export function toDate(str) {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

// Dias entre duas datas (incluindo o fim)
export function diasEntre(inicio, fim) {
  const ms = fim - inicio;
  return Math.floor(ms / (1000 * 60 * 60 * 24)) + 1;
}

// Meses válidos entre duas datas (regra dos 15 dias)
export function mesesValidos(inicio, fim) {
  let count = 0;

  let start = new Date(inicio);
  const end = new Date(fim);

  while (start <= end) {
    const monthEnd = new Date(
      start.getUTCFullYear(),
      start.getUTCMonth() + 1,
      0
    );

    const overlapStart = start;
    const overlapEnd = monthEnd > end ? end : monthEnd;

    const dias = diasEntre(overlapStart, overlapEnd);
    if (dias >= 15) count++;

    // próximo mês
    start = new Date(
      start.getUTCFullYear(),
      start.getUTCMonth() + 1,
      1
    );
  }

  return count;
}

// Meses válidos no ANO do desligamento (para 13º)
export function mesesAnoAtual(admissao, desligamento) {
  const end = toDate(desligamento);
  const ano = end.getUTCFullYear();

  const anoInicio = new Date(Date.UTC(ano, 0, 1));

  const inicioCalculo =
    toDate(admissao) > anoInicio ? toDate(admissao) : anoInicio;

  return mesesValidos(inicioCalculo, desligamento);
}

// Meses válidos totais (FGTS)
export function mesesTotaisFgts(admissao, desligamento) {
  return mesesValidos(admissao, desligamento);
}

// Anos completos trabalhados (para aviso prévio)
export function diffAnos(admissao, desligamento) {
  const a = toDate(admissao);
  const b = toDate(desligamento);

  let anos = b.getUTCFullYear() - a.getUTCFullYear();

  // ainda não fez aniversário naquele ano
  if (
    b.getUTCMonth() < a.getUTCMonth() ||
    (b.getUTCMonth() === a.getUTCMonth() && b.getUTCDate() < a.getUTCDate())
  ) {
    anos--;
  }

  return anos;
}