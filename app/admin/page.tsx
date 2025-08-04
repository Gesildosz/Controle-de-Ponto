import { getAllIDData } from "@/app/actions"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default async function AdminPage() {
  const allIDData = await getAllIDData()

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-4xl mt-8 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-700">Painel de Administração</CardTitle>
          <CardDescription className="text-gray-600">
            Gerencie os dados de colaboradores e horas extras.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4">
            <Link href="/admin/horas" passHref>
              <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                Gerenciar Horas Extras
              </Button>
            </Link>
            <Link href="/admin/ids" passHref>
              <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                Gerenciar IDs
              </Button>
            </Link>
          </div>
          {/* Existing AdminIDEditorClient moved to its own page */}
          {/* <AdminIDEditorClient initialIDData={allIDData} /> */}
        </CardContent>
      </Card>
    </main>
  )
}
