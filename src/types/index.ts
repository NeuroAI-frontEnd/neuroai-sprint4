export interface Paciente {
  id: number;
  nome: string;
  email: string;
  cpf?: string;
  telefone?: string;
  dataNascimento?: string | null;
}

export interface Medico {
  id: number;
  nome: string;
  crm?: string;
  especialidade?: string;
  telefone?: string;
  email?: string;
}

export interface Consulta {
  id: number;
  dataConsulta: string;
  status?: string;
  idPaciente: number;
  idMedico: number;
  hora?: string | null;
}
