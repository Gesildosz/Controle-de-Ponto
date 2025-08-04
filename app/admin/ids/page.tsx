import { getAllIDData } from "@/app/actions"
import { AdminIDEditorClient } from "../admin-id-editor-client"

export default async function AdminIDsPage() {
  const allIDData = await getAllIDData()

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <AdminIDEditorClient initialIDData={allIDData} />
    </main>
  )
}
