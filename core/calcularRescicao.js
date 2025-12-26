// core/calcularRescisao.js // Orquestrador: consolida todos os módulos do motor de cálculo // Retorna um objeto com desglose detalhado + total estimado

import { calcularFerias } from "./ferias"; import { calcularDecimo } from "./decimo"; import { calcularFgts } from "./fgts"; import { calcularAviso } from "./aviso"; import { calcularExperiencia } from "./experiencia"; import { calcularSeguro } from "./seguro";

/**

@param {

admissao: string|Date,

desligamento: string|Date,

salario: number,

tipoContrato: 'clt' | 'experiencia',

tipoDesligamento: 'semJustaCausa' | 'acordo' | 'pedido' | 'justaCausa' | 'experienciaAntes' | 'experienciaFim',

feriasGozadas?: { dias: number, data?: string },

fimPrevistoContrato?: string|Date,

mediaSalarios?: number,

mesesTrabalhados?: number,

configSeguro?: { tabelaFaixas: Array, regraParcelas: Array|Function }

} input */ export function calcularRescisao(input) { // --- blocos independentes --- const ferias = calcularFerias(input); const decimo = calcularDecimo(input); const fgts = calcularFgts(input); const aviso = calcularAviso(input); const experiencia = calcularExperiencia({ tipoContrato: input.tipoContrato, motivo: input.tipoDesligamento, desligamento: input.desligamento, fimPrevistoContrato: input.fimPrevistoContrato, salario: input.salario, });


const seguro = calcularSeguro({ tipoDesligamento: input.tipoDesligamento, mediaSalarios: input.mediaSalarios ?? input.salario, mesesTrabalhados: input.mesesTrabalhados ?? 0, config: input.configSeguro, });

// --- soma de itens que compõem a rescisão imediata (sem FGTS sacado) --- const total = ferias.total + decimo.decimo + fgts.multa + aviso.valor + (experiencia.indenizacao || 0);

return { resumo: { total, observacao: "Valores estimados, podem variar por verbas adicionais e convenções coletivas.", }, itens: { ferias, decimo, fgts, aviso, experiencia, seguro, }, }; }

export default { calcularRescisao };