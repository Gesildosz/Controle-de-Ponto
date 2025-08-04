import { getHorasData } from "@/app/actions"
import { IdInputForm } from "./id-input-form"

export default async function HorasResultPage({ searchParams }: { searchParams: { chapa: string } }) {
  const chapa = searchParams.chapa
  // Fetch horasData to get the name, but don't display hours yet.
  const horasData = await getHorasData(chapa)

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <IdInputForm chapa={chapa} nomeColaborador={horasData?.nome} />
    </main>
  )
}
