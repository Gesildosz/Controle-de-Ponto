import { getHistoricoHorasData } from "@/app/actions"
import { HistoricoHorasClient } from "./historico-horas-client"

export default async function HistoricoHorasPage({ searchParams }: { searchParams: { chapa: string; id: string } }) {
  const chapa = searchParams.chapa
  const id = searchParams.id // Receber o ID
  const historicoData = await getHistoricoHorasData(chapa)

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <HistoricoHorasClient chapa={chapa} id={id} historicoData={historicoData} /> {/* Passar o ID para o cliente */}
    </main>
  )
}
