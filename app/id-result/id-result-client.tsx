"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import type { IDEntry } from "@/lib/types"

interface IDResultClientProps {
  chapa: string
  id: string
  idData: IDEntry | null
}

export function IDResultClient({ chapa, id, idData }: IDResultClientProps) {
  const router = useRouter()

  return (
    <Card className="w-full max-w-md mt-8">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-blue-600">Verificação de ID</CardTitle>
        <CardDescription>
          Resultado da verificação para Chapa: {chapa} e ID: {id}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {idData ? (
          <div className="space-y-2">
            <p>
              <strong>Chapa:</strong> {idData.chapa}
            </p>
            <p>
              <strong>ID:</strong> {idData.id}
            </p>
            <p>
              <strong>Nome:</strong> {idData.nome}
            </p>
            <p className="text-green-600 font-semibold">ID verificado com sucesso!</p>
          </div>
        ) : (
          <p className="text-center text-red-500">ID ou Chapa não encontrados ou não correspondem.</p>
        )}
        <div className="mt-4">
          <Button onClick={() => router.back()} className="w-full bg-gray-300 text-gray-800 hover:bg-gray-400">
            Voltar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
