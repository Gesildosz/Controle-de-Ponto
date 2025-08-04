"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import type { HistoricoHorasEntry } from "@/lib/types"
import { parseTime } from "@/lib/utils"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"

interface HistoricoHorasClientProps {
  chapa: string
  id: string // Adicionar o ID como prop
  historicoData: HistoricoHorasEntry[]
}

export function HistoricoHorasClient({ chapa, id, historicoData }: HistoricoHorasClientProps) {
  const router = useRouter()

  // Prepare data for charts
  const chartData = historicoData.map((entry) => ({
    periodo: entry.periodo,
    horasPositivas: parseTime(entry.horasPositivas),
    horasNegativas: Math.abs(parseTime(entry.horasNegativas)), // Use absolute value for negative hours in bar chart
    saldoFinalHoras: parseTime(entry.saldoFinalHoras),
  }))

  // Get the latest saldo final for the gauge-like display
  const latestEntry = historicoData.length > 0 ? historicoData[historicoData.length - 1] : null
  const latestSaldoNum = latestEntry ? parseTime(latestEntry.saldoFinalHoras) : 0
  const latestSaldoFormatted = latestEntry ? latestEntry.saldoFinalHoras : "00:00"

  let saldoDisplayClass = "text-gray-800" // Default neutral
  if (latestSaldoNum > 0) {
    saldoDisplayClass = "text-green-600" // Positive saldo
  } else if (latestSaldoNum < 0) {
    saldoDisplayClass = "text-red-600" // Negative saldo
  } else {
    saldoDisplayClass = "text-yellow-600" // Zero saldo
  }

  const handleGoBackToColaboradorInfo = () => {
    router.push(`/id-result?chapa=${chapa}&id=${id}`)
  }

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      router.push("/")
    }
  }

  return (
    <Card className="w-full max-w-4xl mt-8 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-blue-700">Histórico de Horas</CardTitle>
        <CardDescription className="text-gray-600">
          Evolução das horas para a chapa: <span className="font-semibold text-blue-600">{chapa}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {historicoData.length > 0 ? ( // <-- Esta condição verifica se há dados de histórico
          <>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Tabela de Histórico</h3>
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Período
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
                    {historicoData.map((entry, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.periodo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                          {entry.horasPositivas}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                          {entry.horasNegativas}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">{entry.saldoFinalHoras}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800">Saldo Final Atual</h3>
              <div className={`text-6xl font-extrabold ${saldoDisplayClass}`}>{latestSaldoFormatted}</div>
              <p className="text-gray-500">Referente ao período mais recente: {latestEntry?.periodo}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Gráfico de Saldo Final de Horas</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="periodo" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="saldoFinalHoras"
                    stroke="#2196F3"
                    activeDot={{ r: 8 }}
                    name="Saldo Final"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Nenhum histórico de horas encontrado para a chapa {chapa}.</p>
        )}

        <div className="mt-4 flex flex-col gap-2">
          <Button
            onClick={handleGoBackToColaboradorInfo} // Nova função para voltar
            className="w-full h-10 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Voltar
          </Button>
          <Button
            onClick={handleLogout} // Nova função para sair com confirmação
            className="w-full h-10 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Sair
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
