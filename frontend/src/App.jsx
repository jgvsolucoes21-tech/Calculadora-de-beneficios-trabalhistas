import React, { useState } from "react";
import { calcularRescisao } from "./core/calcularRescisao";

export default function App() {
  const [admissao, setAdmissao] = useState("");
  const [desligamento, setDesligamento] = useState("");
  const [salario, setSalario] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    try {
      const resultado = calcularRescisao({
        admissao,
        desligamento,
        salario: Number(salario),
        tipoContrato: "clt",
        tipoDesligamento: "semJustaCausa",
      });

      alert(
        `Total estimado: R$ ${resultado.resumo.total.toFixed(2)}`
      );

    } catch (err) {
      alert(`Erro ao calcular: ${err.message}`);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Calculadora de Rescisão — MVP</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Data de admissão (YYYY-MM-DD)"
          value={admissao}
          onChange={(e) => setAdmissao(e.target.value)}
        />

        <input
          placeholder="Data de desligamento (YYYY-MM-DD)"
          value={desligamento}
          onChange={(e) => setDesligamento(e.target.value)}
        />

        <input
          placeholder="Salário"
          value={salario}
          onChange={(e) => setSalario(e.target.value)}
        />

        <button type="submit">Calcular</button>
      </form>
    </div>
  );
}