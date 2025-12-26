// core/aviso.js // Cálculo de aviso prévio indenizado // Regra base (MVP): 30 dias + 3 dias por ano completo trabalhado // Obs: Limites específicos podem ser parametrizados em versões futuras.

import { diffAnos, salarioDiario } from "./utils";

/**

@param {

admissao: string|Date,

desligamento: string|Date,

salario: number,

tipoDesligamento: 'semJustaCausa' | 'acordo' | 'pedido' | 'justaCausa' | 'experienciaAntes' | 'experienciaFim'

} input */ export function calcularAviso(input) { const { admissao, desligamento, salario, tipoDesligamento } = input;


// Em geral, aviso indenizado aplica-se principalmente // na demissão sem justa causa (padrão do MVP) if (tipoDesligamento !== "semJustaCausa") { return { dias: 0, valor: 0 }; }

const anos = diffAnos(admissao, desligamento);

let dias = 30 + anos * 3; // poderá ter teto configurável na V2

const valor = dias * salarioDiario(salario);

return { anosConsiderados: anos, dias, valor, }; }

export default { calcularAviso };