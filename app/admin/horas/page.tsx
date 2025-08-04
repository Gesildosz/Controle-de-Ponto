import { getAllHorasData } from "@/app/actions"
import { AdminHorasEditorClient } from "../admin-horas-editor-client"

export default async function AdminHorasPage() {
  const allHorasData = await getAllHorasData()

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <AdminHorasEditorClient initialHorasData={allHorasData} />
    </main>
  )
}
