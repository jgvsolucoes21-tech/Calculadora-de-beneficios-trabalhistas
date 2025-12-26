// core/fgts.js // Cálculo de FGTS: depósitos mensais + multa conforme tipo de desligamento // Inclui regra de saque (100%, 80% ou 0%)

import { mesesTotaisFgts } from "./utils";

/**

@param {

salario: number,

admissao: string|Date,

desligamento: string|Date,

tipoDesligamento: 'semJustaCausa' | 'acordo' | 'pedido' | 'justaCausa' | 'experienciaAntes' | 'experienciaFim'

} input */ export function calcularFgts(input) { const { salario, admissao, desligamento, tipoDesligamento } = input;


// 1️⃣ Depósitos totais const meses = mesesTotaisFgts(admissao, desligamento); const depositoMensal = salario * 0.08; // 8% const total = meses * depositoMensal;

// 2️⃣ Percentual de multa const map = { semJustaCausa: 0.4, acordo: 0.2, pedido: 0, justaCausa: 0, experienciaAntes: 0, experienciaFim: 0, };

const percentual = map[tipoDesligamento] ?? 0; const multa = total * percentual;

// 3️⃣ Regra de saque let saque = 0; if (tipoDesligamento === "semJustaCausa") saque = total; if (tipoDesligamento === "acordo") saque = total * 0.8;

return { meses, depositoMensal, total, percentualMulta: percentual, multa, saque, }; }

export default { calcularFgts };
