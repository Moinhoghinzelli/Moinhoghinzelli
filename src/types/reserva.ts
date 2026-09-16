export type TipoVisita = "parque" | "guiada";

export type ReservaInput = {
  nome: string;
  telefone: string;
  email?: string;
  dataVisita: string; // formato "YYYY-MM-DD"
  horario: string; // formato "HH:MM"
  tipoVisita: TipoVisita;
  adultos: number;
  criancas5a12: number;
  criancasAte4: number;
  observacoes?: string;
  // campo-armadilha (honeypot) contra bots — deve chegar sempre vazio
  empresa?: string;
};
