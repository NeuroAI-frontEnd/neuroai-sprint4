import { useEffect, useState } from "react";
import { listarConsultas, deletarConsulta } from "../service/api";

export function ConsultasMarcadas() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [consultas, setConsultas] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  const carregar = async () => {
    setCarregando(true);

    const lista = await listarConsultas();

    const resultado = lista.map(c => ({
      id: c.id,
      dataHora: c.dataHora.replace("T", " às ").replace(":00.000", ""),
      modalidade: c.modalidade,
    }));

    setConsultas(resultado);
    setCarregando(false);
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <section className="container mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold my-6">Consultas Marcadas</h1>

      {carregando && <p>Carregando...</p>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {consultas.map((c) => (
          <div key={c.id} className="bg-white shadow p-4 rounded">
            <p><strong>Data:</strong> {c.dataHora}</p>
            <p><strong>Modalidade:</strong> {c.modalidade}</p>

            <button
              onClick={() => { deletarConsulta(c.id).then(carregar); }}
              className="mt-3 bg-red-600 text-white px-3 py-1 rounded"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}