"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import type { HorasEntry } from "@/lib/types"

interface AdminHorasEditorClientProps {
  initialHorasData: HorasEntry[]
}

export function AdminHorasEditorClient({ initialHorasData }: AdminHorasEditorClientProps) {
  const [horasData, setHorasData] = useState<HorasEntry[]>(initialHorasData)
  const router = useRouter()

  const handleCellChange = (rowIndex: number, column: keyof HorasEntry, newValue: string) => {
    setHorasData((prevData) => prevData.map((row, idx) => (idx === rowIndex ? { ...row, [column]: newValue } : row)))
  }

  const handleSave = () => {
    // Em uma aplicação real, você enviaria 'horasData' para uma API de backend aqui.
    // Ex: await fetch('/api/save-horas-data', { method: 'POST', body: JSON.stringify(horasData) });
    console.log("Dados de horas a serem salvos (não persistidos neste ambiente):", horasData)
    alert("Dados de horas 'salvos' (apenas no console, não persistidos no arquivo HTML estático).")
  }

  return (
    <Card className="w-full max-w-6xl mt-8 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-blue-700">Administração de Horas Extras</CardTitle>
        <CardDescription className="text-gray-600">
          Edite os dados de horas extras dos colaboradores.
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
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Função
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Líder
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Turno
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Horas Positivas
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Horas Negativas
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Saldo Final
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {horasData.map((entry, rowIndex) => (
                <tr key={entry.chapa} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.chapa}</td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50"
                    contentEditable
                    onBlur={(e) => handleCellChange(rowIndex, "nome", e.currentTarget.textContent || "")}
                    suppressContentEditableWarning={true}
                  >
                    {entry.nome}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50"
                    contentEditable
                    onBlur={(e) => handleCellChange(rowIndex, "funcao", e.currentTarget.textContent || "")}
                    suppressContentEditableWarning={true}
                  >
                    {entry.funcao}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50"
                    contentEditable
                    onBlur={(e) => handleCellChange(rowIndex, "lider", e.currentTarget.textContent || "")}
                    suppressContentEditableWarning={true}
                  >
                    {entry.lider}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50"
                    contentEditable
                    onBlur={(e) => handleCellChange(rowIndex, "turno", e.currentTarget.textContent || "")}
                    suppressContentEditableWarning={true}
                  >
                    {entry.turno}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50"
                    contentEditable
                    onBlur={(e) => handleCellChange(rowIndex, "status", e.currentTarget.textContent || "")}
                    suppressContentEditableWarning={true}
                  >
                    {entry.status}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50"
                    contentEditable
                    onBlur={(e) => handleCellChange(rowIndex, "horasPositivas", e.currentTarget.textContent || "")}
                    suppressContentEditableWarning={true}
                  >
                    {entry.horasPositivas}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50"
                    contentEditable
                    onBlur={(e) => handleCellChange(rowIndex, "horasNegativas", e.currentTarget.textContent || "")}
                    suppressContentEditableWarning={true}
                  >
                    {entry.horasNegativas}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50"
                    contentEditable
                    onBlur={(e) => handleCellChange(rowIndex, "saldoFinalHoras", e.currentTarget.textContent || "")}
                    suppressContentEditableWarning={true}
                  >
                    {entry.saldoFinalHoras}
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
