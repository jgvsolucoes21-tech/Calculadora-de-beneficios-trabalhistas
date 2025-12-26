// core/utils.js // Utilidades comuns para cálculos trabalhistas (datas e valores) // Mantemos funções puras e testáveis.

// 🔢 Retorna o salário diário considerando regra padrão (30 dias) export function salarioDiario(salario) { return salario / 30; }

// 📆 Normaliza string/Date para Date (UTC, sem horas) export function toDate(dateLike) { const d = new Date(dateLike); return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); }

// 📆 Dias entre duas datas (exclusivo do fim) export function diasEntre(inicio, fim) { const a = toDate(inicio); const b = toDate(fim); const ms = b - a; return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24))); }

// 📆 Meses "válidos" (>=15 dias trabalhados) entre admissão e desligamento export function mesesValidos(admissao, desligamento) { let start = toDate(admissao); const end = toDate(desligamento);

let count = 0;

while (start < end) { const monthStart = new Date(Date.UTC(start.getFullYear(), start.getMonth(), 1)); const monthEnd = new Date(Date.UTC(start.getFullYear(), start.getMonth() + 1, 1));

const overlapStart = start > monthStart ? start : monthStart;
const overlapEnd = end < monthEnd ? end : monthEnd;

const dias = diasEntre(overlapStart, overlapEnd);
if (dias >= 15) count++;

start = monthEnd;

}

return count; }

// 📆 Meses válidos no ANO do desligamento (para 13º) export function mesesAnoAtual(admissao, desligamento) { const end = toDate(desligamento); const ano = end.getUTCFullYear();

const anoInicio = new Date(Date.UTC(ano, 0, 1)); const inicioCalculo = toDate(admissao) > anoInicio ? toDate(admissao) : anoInicio;

return mesesValidos(inicioCalculo, desligamento); }

// 📆 Meses válidos totais (para FGTS) export function mesesTotaisFgts(admissao, desligamento) { return mesesValidos(admissao, desligamento); }

// 📆 Anos completos trabalhados (para aviso prévio) export function diffAnos(admissao, desligamento) { const a = toDate(admissao); const b = toDate(desligamento);

let anos = b.getUTCFullYear() - a.getUTCFullYear();

// se ainda não completou o aniversário naquele ano, subtrai 1 const aniversario = new Date(Date.UTC(b.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate())); if (b < aniversario) anos--;

return Math.max(0, anos); }

// 📆 Períodos aquisitivos completos de férias (12 meses) export function calcularPeriodosCompletos(admissao, desligamento) { const meses = mesesValidos(admissao, desligamento); return Math.floor(meses / 12); }

// 📆 Meses proporcionais do período atual (resto após períodos completos) export function calcularMesesProporcionais(admissao, desligamento) { const meses = mesesValidos(admissao, desligamento); return meses % 12; }

export default { salarioDiario, toDate, diasEntre, mesesValidos, mesesAnoAtual, mesesTotaisFgts, diffAnos, calcularPeriodosCompletos, calcularMesesProporcionais, };