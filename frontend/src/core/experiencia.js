// core/experiencia.js // Regras para contrato de experiência (prazo determinado) // Cobre: término normal, demissão pela empresa antes do término, // e pedido de desligamento pelo funcionário antes do término.

import { diasEntre, salarioDiario } from "./utils";

/**

@param {

tipoContrato: 'clt' | 'experiencia',

motivo: 'empresaAntes' | 'funcionarioAntes' | 'terminoNormal' | string,

desligamento: string|Date,

fimPrevistoContrato?: string|Date,

salario: number

} input */ export function calcularExperiencia(input) { if (input.tipoContrato !== "experiencia") { return { aplica: false, indenizacao: 0, observacao: "Contrato indeterminado — regras de experiência não se aplicam", }; }


const { motivo, desligamento, fimPrevistoContrato, salario } = input;

if (!fimPrevistoContrato) { return { aplica: true, indenizacao: 0, alerta: "Data prevista de término não informada — assumido sem indenização", }; }

const diasRestantes = Math.max(0, diasEntre(desligamento, fimPrevistoContrato));

// 🔹 Regra principal: 50% do que faltava do contrato const base = salarioDiario(salario) * diasRestantes * 0.5;

if (motivo === "empresaAntes") { return { aplica: true, tipo: "demissao_empresa_antes", diasRestantes, indenizacao: base, }; }

if (motivo === "funcionarioAntes") { return { aplica: true, tipo: "pedido_funcionario_antes", diasRestantes, indenizacaoPossivel: base, // pode ser cobrada pela empresa }; }

return { aplica: true, tipo: "termino_normal", diasRestantes: 0, indenizacao: 0, }; }

export default { calcularExperiencia };
