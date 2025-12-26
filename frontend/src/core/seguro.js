// core/seguro.js // Cálculo de Seguro-Desemprego (MVP parametrizável) // Regras: somente para demissão SEM JUSTA CAUSA (CLT) // Valores de faixas e quantidade de parcelas ficam em tabela externa (parametrização)

/**

tabelaFaixas: array ordenado por limiteSuperior

[{ ate: number, fator: number, parcelaFixa?: number }, ...]

regraParcelas: função ou mapa que define qtd. de parcelas por meses trabalhados */


function calcularValorCota(media, tabelaFaixas) { // percorre faixas até encontrar onde a média se encaixa for (const faixa of tabelaFaixas) { if (media <= faixa.ate) { // algumas faixas usam fator, outras somam fixo — deixamos flexível return faixa.parcelaFixa ?? media * faixa.fator; } } // se passou de todas as faixas, usa última regra (geralmente teto fixo) const ultima = tabelaFaixas[tabelaFaixas.length - 1]; return ultima.parcelaFixa ?? media * ultima.fator; }

function calcularQuantidadeParcelas(mesesTrabalhados, regraParcelas) { if (typeof regraParcelas === "function") { return regraParcelas(mesesTrabalhados); } // fallback: mapa simples { minMeses: parcelas } let qtd = 0; for (const faixa of regraParcelas) { if (mesesTrabalhados >= faixa.min) qtd = faixa.parcelas; } return qtd; }

/**

@param {

tipoDesligamento: string,

mediaSalarios: number,           // média dos últimos 3 salários

mesesTrabalhados: number,        // últimos vínculos válidos para o benefício

config: {

tabelaFaixas: Array,

regraParcelas: Array|Function

}

} input */ export function calcularSeguro(input) { const { tipoDesligamento, mediaSalarios, mesesTrabalhados, config } = input;


if (tipoDesligamento !== "semJustaCausa") { return { direito: false, motivo: "Tipo de desligamento não elegível" }; }

if (!config?.tabelaFaixas || !config?.regraParcelas) { return { direito: false, motivo: "Configuração de tabela ausente" }; }

const valorCota = calcularValorCota(mediaSalarios, config.tabelaFaixas); const cotas = calcularQuantidadeParcelas(mesesTrabalhados, config.regraParcelas);

if (cotas === 0) { return { direito: false, motivo: "Tempo mínimo não atingido" }; }

return { direito: true, cotas, valorCota, total: valorCota * cotas, }; }

export default { calcularSeguro };
