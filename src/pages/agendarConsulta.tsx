import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { criarPaciente, listarMedicos, criarConsulta, type Medico } from "../service/api";

type FormData = {
  nome: string;
  email: string;
  cpf?: string;
  telefone?: string;
  dataConsulta: string;
  hora?: string;
  especialidade: string;
};

const ESPECIALIDADES = [
  "Neurologia",
  "Psiquiatria",
  "Psicologia",
  "Pediatria",
];

export function AgendarConsulta() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [mensagem, setMensagem] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listarMedicos()
      .then(setMedicos)
      .catch(() => setMedicos([]));
  }, []);

  const onSubmit = async (data: FormData) => {
    setMensagem(null);
    setLoading(true);

    try {
      const paciente = await criarPaciente({
        nome: data.nome,
        email: data.email,
        cpf: data.cpf || undefined,
        telefone: data.telefone || undefined,
        dataNascimento: null,
      });

      const medicoMatch = medicos.find(
        (m) => m.especialidade.toLowerCase() === data.especialidade.toLowerCase()
      );

      if (!medicoMatch) {
        setMensagem({ type: "error", text: "Nenhum médico encontrado para essa especialidade." });
        setLoading(false);
        return;
      }

      await criarConsulta({
        dataConsulta: data.dataConsulta,
        hora: data.hora || null,
        status: "Agendada",
        idPaciente: paciente.id,
        idMedico: medicoMatch.id,
      });

      setMensagem({ type: "success", text: "Consulta agendada com sucesso!" });
      reset();

    } catch (err) {
      console.error(err);
      setMensagem({ type: "error", text: "Erro ao agendar. Tente novamente." });

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto max-w-lg">
      <h1 className="text-3xl font-bold my-6">Agendar Consulta</h1>

      {mensagem && (
        <div
          className={`mb-4 p-3 rounded text-center ${
            mensagem.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {mensagem.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="block font-medium">Nome Completo</label>
          <input {...register("nome", { required: "Nome é obrigatório" })} className="w-full border rounded p-2" />
          {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input type="email" {...register("email", { required: "Email é obrigatório" })} className="w-full border rounded p-2" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-medium">CPF</label>
            <input {...register("cpf")} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block font-medium">Telefone</label>
            <input {...register("telefone")} className="w-full border rounded p-2" />
          </div>
        </div>

        <div>
          <label className="block font-medium">Especialidade</label>
          <select {...register("especialidade", { required: "Selecione uma especialidade" })} className="w-full border rounded p-2">
            <option value="">Selecione</option>
            {ESPECIALIDADES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.especialidade && <p className="text-red-500">{errors.especialidade.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-medium">Data</label>
            <input type="date" {...register("dataConsulta", { required: "Data é obrigatória" })} className="w-full border rounded p-2" />
            {errors.dataConsulta && <p className="text-red-500">{errors.dataConsulta.message}</p>}
          </div>

          <div>
            <label className="block font-medium">Horário</label>
            <input type="time" {...register("hora")} className="w-full border rounded p-2" />
          </div>
        </div>

        <button disabled={loading} type="submit" className="bg-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded">
          {loading ? "Agendando..." : "Agendar"}
        </button>
      </form>
    </section>
  );
}
