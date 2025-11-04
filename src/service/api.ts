const BASE = "https://java-sprint-4.onrender.com";

export type PacientePayload = {
  nome: string;
  email: string;
  cpf?: string;
  telefone?: string;
  dataNascimento?: string | null;
};

export type Medico = {
  id: number;
  nome: string;
  crm?: string;
  especialidade?: string;
  telefone?: string;
  email?: string;
};

export type Paciente = {
  id: number;
  nome: string;
  email: string;
  cpf?: string;
  telefone?: string;
  dataNascimento?: string | null;
};

export type Consulta = {
  id: number;
  dataConsulta: string;
  status?: string;
  idPaciente: number;
  idMedico: number;
  hora?: string | null;
};

async function safeJson(res: Response) {
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

/* PACIENTES */
export async function listarPacientes(): Promise<Paciente[]> {
  const res = await fetch(`${BASE}/pacientes`);
  return safeJson(res);
}

export async function criarPaciente(payload: PacientePayload): Promise<Paciente> {
  const res = await fetch(`${BASE}/pacientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return safeJson(res);
}

/* MEDICOS */
export async function listarMedicos(): Promise<Medico[]> {
  const res = await fetch(`${BASE}/medicos`);
  return safeJson(res);
}

/* CONSULTAS */
export async function listarConsultas(): Promise<Consulta[]> {
  const res = await fetch(`${BASE}/consultas`);
  return safeJson(res);
}

export async function criarConsulta(payload: Omit<Consulta, "id">) {
  const res = await fetch(`${BASE}/consultas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return safeJson(res);
}

export async function deletarConsulta(id: number) {
  const res = await fetch(`${BASE}/consultas/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar consulta");
  return true;
}
