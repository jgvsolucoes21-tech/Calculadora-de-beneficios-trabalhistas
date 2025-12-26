// Cálculo para contratos de experiência

import { diasEntre, salarioDia } from "./utils";

/**
 * Experiência — calcula indenização quando rescinde antes do fim
 *
 * @param {
 *  tipoContrato: 'clt' | 'experiencia',
 *  motivo: string,
 *  desligamento: string|Date,
 *  fimPrevistoContrato?: string|Date,
 *  salario: number,
 * } input
 */

export function calcularExperiencia(input) {
  if (input.tipoContrato !== "experiencia") {
    return { aplica: false, indenizacao: 0 };
  }

  const desligamento = new Date(input.desligamento);
  const fim = new Date(input.fimPrevistoContrato);

  // Se terminou naturalmente
  if (input.motivo === "experienciaFim") {
    return { aplica: false, indenizacao: 0 };
  }

  // Se foi demitido antes do fim → paga metade do que falta
  if (input.motivo === "experienciaAntes") {
    const diasRestantes = diasEntre(desligamento, fim);

    const indenizacao =
      diasRestantes > 0 ? diasRestantes * salarioDia(input.salario) * 0.5 : 0;

    return {
      aplica: true,
      diasRestantes,
      indenizacao,
    };
  }

  return { aplica: false, indenizacao: 0 };
}