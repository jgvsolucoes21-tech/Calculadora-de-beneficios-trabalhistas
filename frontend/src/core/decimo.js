// core/decimo.js // Cálculo do 13º salário proporcional // Base simples (MVP): considera meses com >= 15 dias no ano do desligamento

import { mesesAnoAtual } from "./utils";

/**

@param {

admissao: string|Date,

desligamento: string|Date,

salario: number

} input */ export function calcularDecimo(input) { const { admissao, desligamento, salario } = input;


// Meses válidos no ano corrente do desligamento const mesesValidos = mesesAnoAtual(admissao, desligamento);

const decimo = salario * (mesesValidos / 12);

return { mesesValidos, decimo, }; }

export default { calcularDecimo };
