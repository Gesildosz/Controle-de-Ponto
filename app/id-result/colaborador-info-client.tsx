"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import type { HorasEntry, IDEntry } from "@/lib/types"
import { cn } from "@/lib/utils" // Import cn for conditional class names
import { XCircle, History, ArrowUpCircle, ArrowDownCircle, MinusCircle } from "lucide-react" // Importar novos ícones
import { parseTime } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar" // Importar Avatar components

interface ColaboradorInfoClientProps {
  chapa: string
  id: string
  idData: IDEntry | null
  horasData: HorasEntry | null
}

export function ColaboradorInfoClient({ chapa, id, idData, horasData }: ColaboradorInfoClientProps) {
  const router = useRouter()
  const [currentDateTime, setCurrentDateTime] = useState("")

  useEffect(() => {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Formato 24 horas
    }
    setCurrentDateTime(now.toLocaleString("pt-BR", options))
  }, [])

  // Function to determine status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "prioridade folga":
        return "status-prioridade-folga"
      case "dar folga a funcionário":
        return "status-dar-folga"
      case "colaborador negativo":
        return "status-colaborador-negativo"
      default:
        return "bg-gray-200 text-gray-800" // Default neutral badge
    }
  }

  const handleViewHistory = () => {
    router.push(`/historico-horas?chapa=${chapa}&id=${id}`)
  }

  const handleViewExtrato = () => {
    router.push(`/extrato?chapa=${chapa}&id=${id}`)
  }

  // Lógica para determinar as horas a serem exibidas (positivas/negativas)
  const displayHorasPositivas = horasData ? horasData.horasPositivas : "00:00"
  const displayHorasNegativas = horasData ? horasData.horasNegativas : "00:00"

  let finalPositivas = displayHorasPositivas
  let finalNegativas = displayHorasNegativas
  let saldoFinalNum = 0

  if (horasData) {
    saldoFinalNum = parseTime(horasData.saldoFinalHoras)

    if (saldoFinalNum > 0) {
      finalNegativas = "00:00"
    } else if (saldoFinalNum < 0) {
      finalPositivas = "00:00"
    } else {
      finalPositivas = "00:00"
      finalNegativas = "00:00"
    }
  }

  // Lógica para o "gauge" do saldo final
  const SaldoGauge = () => {
    let icon = <MinusCircle className="h-5 w-5 text-yellow-500" /> // Aumentado para h-5 w-5
    let tooltipText = "Saldo Neutro"

    if (saldoFinalNum > 0) {
      icon = <ArrowUpCircle className="h-5 w-5 text-green-500" /> // Aumentado para h-5 w-5
      tooltipText = "Saldo Positivo"
    } else if (saldoFinalNum < 0) {
      icon = <ArrowDownCircle className="h-5 w-5 text-red-500" /> // Aumentado para h-5 w-5
      tooltipText = "Saldo Negativo"
    }

    return (
      <span className="inline-flex items-center gap-1" title={tooltipText}>
        {icon}
      </span>
    )
  }

  return (
    <Card className="w-full max-w-md mt-8 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
      <CardHeader className="text-center flex flex-col items-center">
        <div className="flex items-center justify-center gap-4 mb-2">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/images/new-placeholder-avatar.png" alt="Avatar do Colaborador" />
            <AvatarFallback>
              {horasData?.nome
                ? horasData.nome
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "CN"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-2xl font-bold text-blue-700">Informações do Colaborador</CardTitle>
          </div>
        </div>
        <CardDescription className="text-gray-600">
          Detalhes para Chapa: <span className="font-semibold text-blue-600">{chapa}</span> e ID:{" "}
          <span className="font-semibold text-blue-600">{id}</span>
          <br />
          <span className="text-sm text-gray-500">Consulta realizada em: {currentDateTime}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {idData && horasData ? (
          <div className="space-y-3 text-gray-700">
            <p className="text-green-600 font-bold text-center text-lg animate-fade-in">ID verificado com sucesso!</p>
            <div className="border-t border-gray-200 pt-3 space-y-2">
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
              <p className="flex items-center gap-2">
                <strong>Status:</strong>{" "}
                <span className={cn("status-badge", getStatusBadgeClass(horasData.status))}>
                  {horasData.status || "N/A"}
                </span>
                {/* Gauge do Saldo Final */}
                <SaldoGauge />
              </p>
              {/* Novas informações de horas */}
              <p>
                <strong>Horas Positivas:</strong> {finalPositivas}
              </p>
              <p>
                <strong>Horas Negativas:</strong> {finalNegativas}
              </p>
              <p>
                <strong>Saldo Final de Horas:</strong> {horasData.saldoFinalHoras}
              </p>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 animate-fade-in"
            role="alert"
            aria-live="assertive"
          >
            <XCircle className="h-8 w-8 mb-2 text-red-500" />
            <p className="text-center font-semibold text-lg">Não foi possível encontrar um registro correspondente.</p>
            <p className="text-center text-sm mt-1">
              Por favor, verifique o Número da Chapa e o ID inseridos e tente novamente.
            </p>
          </div>
        )}
        <div className="mt-4 flex flex-col gap-2">
          <Button
            onClick={handleViewHistory}
            className="w-full h-10 bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <History className="h-5 w-5" />
            Histórico+
          </Button>
          <Button
            onClick={handleViewExtrato}
            className="w-full h-10 bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <History className="h-5 w-5" /> {/* Pode usar um ícone diferente para Extrato se preferir */}
            Extrato
          </Button>
          <Button
            onClick={() => router.back()}
            className="w-full h-10 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Voltar
          </Button>
          <Button
            onClick={() => router.push("/")} // Redirect to home page for logout
            className="w-full h-10 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Sair
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
