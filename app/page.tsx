import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { submitChapa } from "./actions"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold text-blue-700">Colaborador +</CardTitle>
          <CardDescription className="text-gray-600">Acesse suas consultas de colaborador.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={submitChapa} className="space-y-6">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="chapa" className="text-lg font-medium text-gray-700">
                Número da Chapa
              </Label>
              <Input
                id="chapa"
                name="chapa"
                placeholder="Ex: 220001234"
                required
                className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Consultar
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
