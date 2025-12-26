// core/ferias.js // Cálculo de férias (pendentes + proporcionais + 1/3) // Inclui desconto de férias já gozadas (com 1/3) e fluxo poka‑yoke.

import { calcularPeriodosCompletos, calcularMesesProporcionais, salarioDiario, } from "./utils";

/**

@param {

admissao: string|Date,

desligamento: string|Date,

salario: number,

feriasGozadas?: { dias: number, data?: string }

} input */ export function calcularFerias(input) { const { admissao, desligamento, salario, feriasGozadas } = input;


// 1️⃣ períodos aquisitivos completos (12 meses) const periodosCompletos = calcularPeriodosCompletos(admissao, desligamento);

// 2️⃣ meses proporcionais do ciclo atual const mesesProp = calcularMesesProporcionais(admissao, desligamento);

// ---- Férias completas ---- const feriasCompletas = salario * periodosCompletos; const tercoCompletas = feriasCompletas / 3;

// ---- Férias proporcionais ---- const feriasProporcionais = salario * (mesesProp / 12); const tercoProporcional = feriasProporcionais / 3;

// ---- Desconto de férias já gozadas ---- // Considera salário integral + 1/3 do período usufruído let descontoGozadas = 0; if (feriasGozadas && feriasGozadas.dias > 0) { const baseDias = salarioDiario(salario) * feriasGozadas.dias; descontoGozadas = baseDias * (4 / 3); // inclui 1/3 constitucional }

const subtotal = feriasCompletas + tercoCompletas + feriasProporcionais + tercoProporcional;

const total = Math.max(0, subtotal - descontoGozadas);

return { periodosCompletos, mesesProporcionais: mesesProp, feriasCompletas, tercoCompletas, feriasProporcionais, tercoProporcional, descontoGozadas, total, }; }

export default { calcularFerias };