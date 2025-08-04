import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { IntroScreen } from "@/components/intro-screen" // Import the new IntroScreen component

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Colaborador +",
  description: "Aplicação de consulta para colaboradores",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <IntroScreen /> {/* Render the IntroScreen here */}
        {children}
      </body>
    </html>
  )
}
