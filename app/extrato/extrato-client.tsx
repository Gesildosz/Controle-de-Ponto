"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import type { HorasEntry, HistoricoHorasEntry } from "@/lib/types"
import { parseTime } from "@/lib/utils"
import { Download, ArrowLeft } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface ExtratoClientProps {
  chapa: string
  id: string
  currentHoras: HorasEntry | null
  historico: HistoricoHorasEntry[]
}

export function ExtratoClient({ chapa, id, currentHoras, historico }: ExtratoClientProps) {
  const router = useRouter()

  const handleGoBackToColaboradorInfo = () => {
    router.push(`/id-result?chapa=${chapa}&id=${id}`)
  }

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      router.push("/")
    }
  }

  const generatePdf = async () => {
    const input = document.getElementById("extrato-content")
    if (input) {
      const canvas = await html2canvas(input, { scale: 2 }) // Aumenta a escala para melhor qualidade
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`extrato_horas_${chapa}.pdf`)
    }
  }

  const latestSaldoNum = historico.length > 0 ? parseTime(historico[historico.length - 1].saldoFinalHoras) : 0
  let saldoDisplayClass = "text-gray-800" // Default neutral
  if (latestSaldoNum > 0) {
    saldoDisplayClass = "text-green-600" // Positive saldo
  } else if (latestSaldoNum < 0) {
    saldoDisplayClass = "text-red-600" // Negative saldo
  } else {
    saldoDisplayClass = "text-yellow-600" // Zero saldo
  }

  return (
    <Card className="w-full max-w-4xl mt-8 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-blue-700">Extrato de Horas</CardTitle>
        <CardDescription className="text-gray-600">
          Extrato detalhado para:{" "}
          <span className="font-semibold text-blue-600">{currentHoras?.nome || "Colaborador Desconhecido"}</span>{" "}
          (Chapa: <span className="font-semibold text-blue-600">{chapa}</span>)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {historico.length > 0 ? (
          <>
            <div id="extrato-content" className="space-y-4 p-4 bg-white rounded-lg shadow-inner">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Movimentações de Horas</h3>
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
                        Saldo do Período
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {historico.map((entry, index) => (
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
              <div className="mt-6 text-right text-lg font-bold">
                <p>
                  Saldo Final Atual:{" "}
                  <span className={saldoDisplayClass}>{currentHoras?.saldoFinalHoras || "00:00"}</span>
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <Button
                onClick={generatePdf}
                className="h-10 bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Download className="h-5 w-5" />
                Gerar PDF
              </Button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Nenhum extrato de horas encontrado para a chapa {chapa}.</p>
        )}

        <div className="mt-4 flex flex-col gap-2">
          <Button
            onClick={handleGoBackToColaboradorInfo}
            className="w-full h-10 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar
          </Button>
          <Button
            onClick={handleLogout}
            className="w-full h-10 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Sair
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
