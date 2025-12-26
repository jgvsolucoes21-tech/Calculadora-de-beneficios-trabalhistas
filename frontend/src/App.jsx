import React, { useState } from "react";
import { calcularRescisao } from "./core/calcularRescisao.js";

export default function App() {
  const [form, setForm] = useState({
    admissao: "",
    desligamento: "",
    salario: "",
    tipoContrato: "clt",
    tipoDesligamento: "",
  });

  const [resultado, setResultado] = useState(null);

  const update = (field, value) =>
    setForm((f) => ({ ...f, [field]: value }));

  const calcular = () => {
    try {
      const r = calcularRescisao({
        admissao: form.admissao,
        desligamento: form.desligamento,
        salario: Number(form.salario),
        tipoContrato: form.tipoContrato,
        tipoDesligamento: form.tipoDesligamento,
      });

      setResultado(r);
    } catch (e) {
      alert("Erro ao calcular: " + e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">
        Calculadora de Rescisão — MVP
      </h1>

      <div className="space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Data de admissão (YYYY-MM-DD)"
          value={form.admissao}
          onChange={(e) => update("admissao", e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Data de desligamento (YYYY-MM-DD)"
          value={form.desligamento}
          onChange={(e) => update("desligamento", e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Salário"
          value={form.salario}
          onChange={(e) => update("salario", e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={calcular}
        >
          Calcular
        </button>
      </div>

      {resultado && (
        <div className="mt-6 p-4 border bg-white rounded">
          <h2 className="font-semibold mb-2">Resultado</h2>
          <pre className="text-sm">
            {JSON.stringify(resultado.resumo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
