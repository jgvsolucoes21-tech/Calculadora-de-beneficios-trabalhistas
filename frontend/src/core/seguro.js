// Cálculo do Seguro-Desemprego (regras simplificadas)

export function calcularSeguro({ tipoDesligamento, mediaSalarios, mesesTrabalhados, config }) {
  // Só tem direito sem justa causa ou acordo (simplificação)
  const temDireito =
    tipoDesligamento === "semJustaCausa" ||
    tipoDesligamento === "acordo";

  if (!temDireito) {
    return {
      temDireito: false,
      parcelas: 0,
      valorParcela: 0,
      total: 0,
    };
  }

  // valor base por faixa (pode vir de config futura)
  const tabela = config?.tabelaFaixas || [
    { limite: 2000, multiplicador: 0.8 },
    { limite: 3000, multiplicador: 0.5 },
    { limite: Infinity, multiplicador: 0.4 },
  ];

  let valorBase = 0;

  for (const faixa of tabela) {
    if (mediaSalarios <= faixa.limite) {
      valorBase = mediaSalarios * faixa.multiplicador;
      break;
    }
  }

  // número de parcelas
  let parcelas = 0;

  if (mesesTrabalhados >= 24) parcelas = 5;
  else if (mesesTrabalhados >= 18) parcelas = 4;
  else if (mesesTrabalhados >= 12) parcelas = 3;

  return {
    temDireito: true,
    parcelas,
    valorParcela: valorBase,
    total: parcelas * valorBase,
  };
}