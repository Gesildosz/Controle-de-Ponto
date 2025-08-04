import { getIDData, getHorasData } from "@/app/actions"
import { ColaboradorInfoClient } from "./colaborador-info-client"

export default async function IDResultPage({ searchParams }: { searchParams: { chapa: string; id: string } }) {
  const chapa = searchParams.chapa
  const id = searchParams.id

  // Primeiro, verifica o ID
  const idData = await getIDData(chapa, id)

  let horasData = null
  if (idData) {
    // Se o ID for válido, busca os dados de horas extras
    horasData = await getHorasData(chapa)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <ColaboradorInfoClient chapa={chapa} id={id} idData={idData} horasData={horasData} />
    </main>
  )
}
