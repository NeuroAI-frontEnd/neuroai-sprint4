import { useForm } from "react-hook-form";
import { criarConsulta } from "../service/api";
import { useState } from "react";

type FormData = {
  data: string;
  hora: string;
  modalidade: "Online" | "Presencial";
};

export function AgendarConsulta() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [mensagem, setMensagem] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMensagem(null);

    try {
      const dataHora = `${data.data}T${data.hora}:00`;

      await criarConsulta({
        dataHora,
        modalidade: data.modalidade,
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
        <div className={`p-3 rounded ${mensagem.type === "success" ? "bg-green-200" : "bg-red-200"}`}>
          {mensagem.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label>Modalidade</label>
          <select {...register("modalidade")} className="w-full border p-2 rounded">
            <option value="Presencial">Presencial</option>
            <option value="Online">Online</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label>Data</label>
            <input type="date" {...register("data", { required: true })} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label>Horário</label>
            <input type="time" {...register("hora", { required: true })} className="w-full border p-2 rounded" />
          </div>
        </div>

        <button disabled={loading} className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded w-full">
          {loading ? "Agendando..." : "Agendar"}
        </button>
      </form>
    </section>
  );
}