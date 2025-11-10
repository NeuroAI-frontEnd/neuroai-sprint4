export type Consulta = {
  id?: number;
  dataHora: string;
  modalidade: "Online" | "Presencial";
};

const BASE_URL = "https://java-sprint-4.onrender.com";

export async function listarConsultas(): Promise<Consulta[]> {
  const res = await fetch(`${BASE_URL}/consultas`);
  return res.json();
}

export async function criarConsulta(data: Consulta): Promise<Consulta> {
  const res = await fetch(`${BASE_URL}/consultas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao criar consulta");
  return res.json();
}

export async function deletarConsulta(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/consultas/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao excluir consulta");
}
