export type Paciente = {
  id: number;
  nome: string;
  email: string;
  cpf?: string;
  telefone?: string;
  dataNascimento: string | null;
};

export type Medico = {
  id: number;
  nome: string;
  crm: string;
  especialidade: string;
  telefone: string;
  email: string;
};

export type Consulta = {
  id?: number;
  dataConsulta: string;   
  hora?: string | null;   
  status: string;
  idPaciente: number;
  idMedico: number;
};


const BASE_URL = "https://java-sprint-4.onrender.com";


export async function listarMedicos(): Promise<Medico[]> {
  const res = await fetch(`${BASE_URL}/medicos`);
  return res.json();
}


export async function criarPaciente(data: Omit<Paciente, "id">): Promise<Paciente> {
  const res = await fetch(`${BASE_URL}/pacientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}


export async function criarConsulta(data: Consulta): Promise<Consulta> {
  const res = await fetch(`${BASE_URL}/consultas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}


export async function listarConsultas(): Promise<Consulta[]> {
  const res = await fetch(`${BASE_URL}/consultas`);
  return res.json();
}