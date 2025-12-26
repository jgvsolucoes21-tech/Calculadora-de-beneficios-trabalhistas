import React, { useState } from "react";
import { calcularRescisao } from "./core/calcularRescisao.js";

export default function App() {
  const [step, setStep] = useState(1);
  const [resultado, setResultado] = useState(null);

  const [form, setForm] = useState({
    admissao: "",
    desligamento: "",
    salario: "",
    tipoContrato: "clt",
    tipoDesligamento: "",
    tirouFerias: "",
    feriasDias: "",
    feriasMesAno: "",
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(1, s - 1));

  const update = (field, value) =>
    setForm((f) => ({ ...f, [field]: value }));

  const StepBox = ({ title, children }) => (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="max-w-xl mx-auto text-center mt-4">
        <h1 className="text-2xl font-bold">Simulador de Rescisão</h1>
        <p className="text-gray-500 mt-1">
          Calcule seus direitos: férias, 13º, FGTS e mais
        </p>
      </header>

      <div className="max-w-xl mx-auto mt-6 flex justify-between text-sm text-gray-500">
        {["Dados", "Contrato", "Motivo", "Férias", "Resultado"].map(
          (label, i) => (
            <div
              key={label}
              className={i + 1 === step ? "font-semibold text-gray-900" : ""}
            >
              {label}
            </div>
          )
        )}
      </div>

      {step === 1 && (
        <StepBox title="Dados do contrato">
          <div>
            <label className="block text-sm mb-1">Data de admissão</label>
            <input
              type="date"
              className="w-full border rounded-xl p-2"
              value={form.admissao}
              onChange={(e) => update("admissao", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Data de desligamento
            </label>
            <input
              type="date"
              className="w-full border rounded-xl p-2"
              value={form.desligamento}
              onChange={(e) => update("desligamento", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Salário mensal</label>
            <input
              type="number"
              className="w-full border rounded-xl p-2"
              placeholder="R$"
              value={form.salario}
              onChange={(e) => update("salario", e.target.value)}
            />
          </div>

          <div className="flex justify-between pt-2">
            <div />
            <button
              onClick={next}
              className="px-4 py-2 rounded-xl bg-gray-900 text-white"
            >
              Próximo
            </button>
          </div>
        </StepBox>
      )}

      {step === 2 && (
        <StepBox title="Tipo de contrato">
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="contrato"
                checked={form.tipoContrato === "clt"}
                onChange={() => update("tipoContrato", "clt")}
              />
              CLT (indeterminado)
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="contrato"
                checked={form.tipoContrato === "experiencia"}
                onChange={() => update("tipoContrato", "experiencia")}
              />
              Contrato de experiência
            </label>

            <p className="text-xs text-gray-500">
              Se o contrato tinha uma data final definida, provavelmente é de
              experiência.
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <button onClick={back} className="px-4 py-2 rounded-xl border">
              Voltar
            </button>
            <button
              onClick={next}
              className="px-4 py-2 rounded-xl bg-gray-900 text-white"
            >
              Próximo
            </button>
          </div>
        </StepBox>
      )}

      {step === 3 && (
        <StepBox title="Motivo do desligamento">
          <div className="space-y-2">
            {form.tipoContrato === "clt" && (
              <>
                <Option
                  label="Demissão sem justa causa"
                  value="semJustaCausa"
                  form={form}
                  update={update}
                />
                <Option
                  label="Acordo entre as partes"
                  value="acordo"
                  form={form}
                  update={update}
                />
                <Option
                  label="Pedido de demissão"
                  value="pedido"
                  form={form}
                  update={update}
                />
                <Option
                  label="Demissão com justa causa"
                  value="justaCausa"
                  form={form}
                  update={update}
                />
              </>
            )}

            {form.tipoContrato === "experiencia" && (
              <>
                The
                <Option
                  label="Demissão pela empresa antes do término"
                  value="empresaAntes"
                  form={form}
                  update={update}
                />
                <Option
                  label="Pedido de desligamento antes do término"
                  value="funcionarioAntes"
                  form={form}
                  update={update}
                />
                <Option
                  label="Término normal do contrato"
                  value="experienciaFim"
                  form={form}
                  update={update}
                />
              </>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button onClick={back} className="px-4 py-2 rounded-xl border">
              Voltar
            </button>
            <button
              onClick={next}
              className="px-4 py-2 rounded-xl bg-gray-900 text-white"
            >
              Próximo
            </button>
          </div>
        </StepBox>
      )}

      {step === 4 && (
        <StepBox title="Férias">
          <p className="text-sm text-gray-600">
            Pelo seu tempo trabalhado, você provavelmente acumulou férias.
            Vamos apenas confirmar para deixar o cálculo mais preciso.
          </p>

          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="ferias"
                onChange={() => update("tirouFerias", "sim")}
              />
              Sim, tirei férias
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="ferias"
                onChange={() => update("tirouFerias", "nao")}
              />
              Não lembro / Acho que não
            </label>
          </div>

          {form.tirouFerias === "sim" && (
            <div className="mt-3 space-y-3">
              <div>
                <label className="block text-sm mb-1">
                  Quando foi a última vez?
                </label>
                <input
                  type="month"
                  className="w-full border rounded-xl p-2"
                  onChange={(e) => update("feriasMesAno", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Quantos dias?</label>
                <select
                  className="w-full border rounded-xl p-2"
                  onChange={(e) => update("feriasDias", e.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button onClick={back} className="px-4 py-2 rounded-xl border">
              Voltar
            </button>

            <button
              onClick={() => {
                const res = calcularRescisao({
                  ...form,
                  salario: Number(form.salario),
                });

                setResultado(res);
                next();
              }}
              className="px-4 py-2 rounded-xl bg-gray-900 text-white"
            >
              Ver resultado
            </button>
          </div>
        </StepBox>
      )}

      {step === 5 && (
        <StepBox title="Resultado">
          {!resultado && (
            <p className="text-sm text-gray-500">
              Não foi possível calcular — tente novamente.
            </p>
          )}

          {resultado && (
            <div className="mt-3 space-y-2 text-sm">
              <div>
                Total estimado:{" "}
                <strong>
                  R$ {resultado.resumo.total.toFixed(2)}
                </strong>
              </div>

              <div>Férias: R$ {resultado.itens.ferias.total.toFixed(2)}</div>
              <div>13º: R$ {resultado.itens.decimo.decimo.toFixed(2)}</div>
              <div>
                FGTS (multa): R$ {resultado.itens.fgts.multa.toFixed(2)}
              </div>
              <div>
                Aviso prévio: R$ {resultado.itens.aviso.valor.toFixed(2)}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button onClick={back} className="px-4 py-2 rounded-xl border">
              Voltar
            </button>
            <button className="px-4 py-2 rounded-xl bg-gray-900 text-white">
              Salvar simulação
            </button>
          </div>
        </StepBox>
      )}
    </div>
  );
}

function Option({ label, value, form, update }) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="motivo"
        checked={form.tipoDesligamento === value}
        onChange={() => update("tipoDesligamento", value)}
      />
      {label}
    </label>
  );
}