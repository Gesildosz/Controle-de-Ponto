"use client"

import { submitID } from "@/app/actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import type { HorasEntry } from "@/lib/types"

interface HorasResultClientProps {
  chapa: string
  horasData: HorasEntry | null
}

export function HorasResultClient({ chapa, horasData }: HorasResultClientProps) {
  const router = useRouter()

  return (
    <Card className="w-full max-w-md mt-8">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-blue-600">Detalhes do Colaborador</CardTitle>
        <CardDescription>Informações de horas extras para a chapa: {chapa}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {horasData ? (
          <div className="space-y-2">
            <p>
              <strong>Nome:</strong> {horasData.nome}
            </p>
            <p>
              <strong>Função:</strong> {horasData.funcao}
            </p>
            <p>
              <strong>Líder:</strong> {horasData.lider}
            </p>
            <p>
              <strong>Turno:</strong> {horasData.turno}
            </p>
            <p>
              <strong>Status:</strong> {horasData.status}
            </p>
          </div>
        ) : (
          <p className="text-center text-red-500">Nenhum dado encontrado para a chapa {chapa}.</p>
        )}

        <form action={submitID} className="space-y-4 mt-6">
          {/* Hidden input to pass the chapa to the next step */}
          <input type="hidden" name="chapa" value={chapa} />
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="id">ID Cadastrado</Label>
            <Input id="id" name="id" placeholder="Digite seu ID cadastrado" required />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Verificar ID
          </Button>
        </form>

        <div className="mt-4">
          <Button onClick={() => router.back()} className="w-full bg-gray-300 text-gray-800 hover:bg-gray-400">
            Voltar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
