export type HorasEntry = {
  chapa: string
  nome: string
  funcao: string
  lider: string
  turno: string
  status: string
  horasPositivas: string // Novo campo
  horasNegativas: string // Novo campo
  saldoFinalHoras: string // Novo campo
}

export type IDEntry = {
  chapa: string
  id: string
  nome: string
}

// Novo tipo para o histórico de horas
export type HistoricoHorasEntry = {
  chapa: string
  periodo: string // Ex: "Jan/2023"
  horasPositivas: string
  horasNegativas: string
  saldoFinalHoras: string
}
