"use client"

import { submitID } from "@/app/actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

interface IdInputFormProps {
  chapa: string
  nomeColaborador?: string | null
}

export function IdInputForm({ chapa, nomeColaborador }: IdInputFormProps) {
  const router = useRouter()

  return (
    <Card className="w-full max-w-md mt-8 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-blue-700">Verificação de ID</CardTitle>
        <CardDescription className="text-gray-600">
          {nomeColaborador ? `Olá, ${nomeColaborador}! ` : ""}
          Por favor, digite seu ID cadastrado para a chapa: <span className="font-semibold text-blue-600">{chapa}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form action={submitID} className="space-y-6">
          {/* Hidden input to pass the chapa to the next step */}
          <input type="hidden" name="chapa" value={chapa} />
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="id" className="text-lg font-medium text-gray-700">
              ID Cadastrado
            </Label>
            <Input
              id="id"
              name="id"
              placeholder="Digite seu ID cadastrado"
              required
              className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Verificar ID
          </Button>
        </form>

        <div className="mt-4">
          <Button
            onClick={() => router.back()}
            className="w-full h-10 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Voltar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
