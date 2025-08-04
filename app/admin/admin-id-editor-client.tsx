"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import type { IDEntry } from "@/lib/types"

interface AdminIDEditorClientProps {
  initialIDData: IDEntry[]
}

export function AdminIDEditorClient({ initialIDData }: AdminIDEditorClientProps) {
  const [idData, setIdData] = useState<IDEntry[]>(initialIDData)
  const router = useRouter()

  const handleCellChange = (rowIndex: number, column: keyof IDEntry, newValue: string) => {
    setIdData((prevData) => prevData.map((row, idx) => (idx === rowIndex ? { ...row, [column]: newValue } : row)))
  }

  const handleSave = () => {
    // Em uma aplicação real, você enviaria 'idData' para uma API de backend aqui.
    // Ex: await fetch('/api/save-id-data', { method: 'POST', body: JSON.stringify(idData) });
    console.log("Dados a serem salvos (não persistidos neste ambiente):", idData)
    alert("Dados 'salvos' (apenas no console, não persistidos no arquivo HTML estático).")
  }

  return (
    <Card className="w-full max-w-4xl mt-8 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-blue-700">Administração de IDs</CardTitle>
        <CardDescription className="text-gray-600">
          Edite os dados de identificação dos colaboradores.
          <br />
          <span className="font-bold text-red-500">
            Atenção: As alterações feitas aqui NÃO são salvas no arquivo HTML estático. Para persistência, seria
            necessário um banco de dados.
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  CHAPA
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Nome
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {idData.map((entry, rowIndex) => (
                <tr key={entry.chapa} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.chapa}</td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50"
                    contentEditable
                    onBlur={(e) => handleCellChange(rowIndex, "id", e.currentTarget.textContent || "")}
                    suppressContentEditableWarning={true} // Para evitar warning do React
                  >
                    {entry.id}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50"
                    contentEditable
                    onBlur={(e) => handleCellChange(rowIndex, "nome", e.currentTarget.textContent || "")}
                    suppressContentEditableWarning={true} // Para evitar warning do React
                  >
                    {entry.nome}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            onClick={handleSave}
            className="h-10 bg-green-600 hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Salvar Alterações (Simulado)
          </Button>
          <Button
            onClick={() => router.back()}
            className="h-10 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Voltar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
