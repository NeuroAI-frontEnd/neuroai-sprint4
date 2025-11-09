import { useEffect, useState } from "react";
import { 
  listarConsultas, 
  listarPacientes, 
  listarMedicos, 
  deletarConsulta, 
  type Paciente, 
  type Medico, 
  type Consulta 
} from "../service/api";

type ConsultaFull = {
  id: number;
  pacienteNome: string;
  pacienteEmail: string;
  medicoNome: string;
  medicoEspecialidade?: string;
  dataConsulta: string;
  hora?: string | null;
  status?: string;
};

export function ConsultasMarcadas() {
  const [consultas, setConsultas] = useState<ConsultaFull[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    setErro(null);
    try {
      const [rawConsultas, pacientes, medicos] = await Promise.all([
        listarConsultas(),
        listarPacientes(),
        listarMedicos(),
      ]);

      const mapPac = new Map<number, Paciente>();
      pacientes.forEach((p) => mapPac.set(p.id, p));

      const mapMed = new Map<number, Medico>();
      medicos.forEach((m) => mapMed.set(m.id, m));

      const full: ConsultaFull[] = rawConsultas.map((c: Consulta) => {
        const pac = mapPac.get(c.idPaciente) ?? { nome: "Paciente desconhecido", email: "" };
        const med = mapMed.get(c.idMedico) ?? { nome: "Médico desconhecido", especialidade: "" };

        return {
          id: c.id!,
          pacienteNome: pac.nome,
          pacienteEmail: pac.email,
          medicoNome: med.nome,
          medicoEspecialidade: med.especialidade,
          dataConsulta: c.dataConsulta,
          hora: c.hora ?? null,
          status: c.status,
        };
      });

      setConsultas(full);
    } catch (err) {
      console.error(err);
      setErro("Erro ao carregar consultas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Confirmar exclusão da consulta?")) return;
    try {
      await deletarConsulta(id);
      fetchAll();
    } catch {
      alert("Erro ao deletar");
    }
  };

  if (loading) return <p>Carregando consultas...</p>;
  if (erro) return <p className="text-red-600">{erro}</p>;

  return (
    <section className="container mx-auto">
      <h1 className="text-3xl font-bold my-6">Consultas Marcadas</h1>

      {consultas.length === 0 ? (
        <p className="text-gray-600">Nenhuma consulta marcada.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {consultas.map((c) => (
            <div key={c.id} className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold">{c.pacienteNome}</h2>
                <p className="text-sm text-gray-600">Email: {c.pacienteEmail}</p>
                <p className="mt-2"><strong>Especialidade:</strong> {c.medicoEspecialidade}</p>
                <p><strong>Médico:</strong> {c.medicoNome}</p>
                <p className="mt-2"><strong>Data:</strong> {c.dataConsulta}{c.hora ? ` às ${c.hora}` : ""}</p>
                {c.status && <p className="text-sm text-gray-500">Status: {c.status}</p>}
              </div>

              <div className="mt-4 flex gap-2">
                <button 
                  onClick={() => handleDelete(c.id)} 
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}