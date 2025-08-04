import { getExtratoData } from "@/app/actions"
import { ExtratoClient } from "./extrato-client"

export default async function ExtratoPage({ searchParams }: { searchParams: { chapa: string; id: string } }) {
  const chapa = searchParams.chapa
  const id = searchParams.id
  const { currentHoras, historico } = await getExtratoData(chapa)

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <ExtratoClient chapa={chapa} id={id} currentHoras={currentHoras} historico={historico} />
    </main>
  )
}
