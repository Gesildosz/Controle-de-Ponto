"use server"

import { parseHorasHtml, parseIDHtml, parseHistoricoHorasHtml } from "@/lib/html-parser"
import type { HorasEntry, IDEntry, HistoricoHorasEntry } from "@/lib/types"
import { redirect } from "next/navigation"

/**
 * Fetches and parses horas.html to find data for a specific 'chapa'.
 * @param chapa The 'número da chapa' to search for.
 * @returns The HorasEntry object if found, otherwise null.
 */
export async function getHorasData(chapa: string): Promise<HorasEntry | null> {
  try {
    console.log(`getHorasData: Tentando buscar /horas.html`)
    const response = await fetch("/horas.html", { cache: "no-store" })

    if (!response.ok) {
      console.error(`getHorasData: Erro ao buscar horas.html. Status: ${response.status} ${response.statusText}`)
      return null
    }

    const htmlContent = await response.text()
    console.log(`getHorasData: horas.html buscado com sucesso. Tamanho: ${htmlContent.length} caracteres.`)
    const data = await parseHorasHtml(htmlContent)
    const foundEntry = data.find((entry) => entry.chapa === chapa)
    if (!foundEntry) {
      console.log(`getHorasData: Chapa ${chapa} não encontrada nos dados de horas extras.`)
    }
    return foundEntry || null
  } catch (error) {
    console.error("getHorasData: Erro ao buscar ou analisar horas.html:", error)
    return null
  }
}

/**
 * Fetches and parses ID.html to find data for a specific 'chapa' and 'id'.
 * @param chapa The 'número da chapa' to search for.
 * @param id The 'ID' to search for.
 * @returns The IDEntry object if found, otherwise null.
 */
export async function getIDData(chapa: string, id: string): Promise<IDEntry | null> {
  try {
    console.log(`getIDData: Tentando buscar /ID.html`)
    const response = await fetch("/ID.html", { cache: "no-store" })

    if (!response.ok) {
      console.error(`getIDData: Erro ao buscar ID.html. Status: ${response.status} ${response.statusText}`)
      return null
    }

    const htmlContent = await response.text()
    console.log(`getIDData: ID.html buscado com sucesso. Tamanho: ${htmlContent.length} caracteres.`)
    const data = await parseIDHtml(htmlContent)
    const foundEntry = data.find((entry) => entry.chapa === chapa && entry.id.toLowerCase() === id.toLowerCase())
    if (!foundEntry) {
      console.log(`getIDData: Chapa ${chapa} com ID ${id} não encontrada ou não corresponde nos dados de ID.`)
    }
    return foundEntry || null
  } catch (error) {
    console.error("getIDData: Erro ao buscar ou analisar ID.html:", error)
    return null
  }
}

/**
 * Fetches and parses ID.html to get all identification data.
 * This is for the admin interface.
 * @returns An array of all IDEntry objects.
 */
export async function getAllIDData(): Promise<IDEntry[]> {
  try {
    console.log(`getAllIDData: Tentando buscar /ID.html`)
    const response = await fetch("/ID.html", { cache: "no-store" })

    if (!response.ok) {
      console.error(`getAllIDData: Erro ao buscar ID.html. Status: ${response.status} ${response.statusText}`)
      return []
    }

    const htmlContent = await response.text()
    console.log(`getAllIDData: ID.html buscado com sucesso. Tamanho: ${htmlContent.length} caracteres.`)
    const data = await parseIDHtml(htmlContent)
    return data
  } catch (error) {
    console.error("getAllIDData: Erro ao buscar ou analisar todos os dados de ID.html:", error)
    return []
  }
}

/**
 * Fetches and parses horas.html to get all hours data.
 * This is for the admin interface.
 * @returns An array of all HorasEntry objects.
 */
export async function getAllHorasData(): Promise<HorasEntry[]> {
  try {
    console.log(`getAllHorasData: Tentando buscar /horas.html`)
    const response = await fetch("/horas.html", { cache: "no-store" })

    if (!response.ok) {
      console.error(`getAllHorasData: Erro ao buscar horas.html. Status: ${response.status} ${response.statusText}`)
      return []
    }

    const htmlContent = await response.text()
    console.log(`getAllHorasData: horas.html buscado com sucesso. Tamanho: ${htmlContent.length} caracteres.`)
    const data = await parseHorasHtml(htmlContent)
    return data
  } catch (error) {
    console.error("getAllHorasData: Erro ao buscar ou analisar todos os dados de horas.html:", error)
    return []
  }
}

/**
 * Fetches and parses historico-horas.html to find historical data for a specific 'chapa'.
 * @param chapa The 'número da chapa' to search for.
 * @returns An array of HistoricoHorasEntry objects for the given chapa.
 */
export async function getHistoricoHorasData(chapa: string): Promise<HistoricoHorasEntry[]> {
  try {
    console.log(`getHistoricoHorasData: Tentando buscar /historico-horas.html`)
    const response = await fetch("/historico-horas.html", { cache: "no-store" })

    if (!response.ok) {
      console.error(
        `getHistoricoHorasData: Erro ao buscar historico-horas.html. Status: ${response.status} ${response.statusText}`,
      )
      return []
    }

    const htmlContent = await response.text()
    console.log(
      `getHistoricoHorasData: historico-horas.html buscado com sucesso. Tamanho: ${htmlContent.length} caracteres.`,
    )
    const allData = await parseHistoricoHorasHtml(htmlContent)
    const filteredData = allData.filter((entry) => entry.chapa === chapa)
    if (filteredData.length === 0) {
      console.log(`getHistoricoHorasData: Nenhuma entrada de histórico encontrada para a chapa ${chapa}.`)
    }
    return filteredData
  } catch (error) {
    console.error("getHistoricoHorasData: Erro ao buscar ou analisar historico-horas.html:", error)
    return []
  }
}

/**
 * Fetches combined data for the Extrato page (current hours info + historical hours).
 * @param chapa The 'número da chapa' to search for.
 * @returns An object containing HorasEntry and HistoricoHorasEntry array.
 */
export async function getExtratoData(
  chapa: string,
): Promise<{ currentHoras: HorasEntry | null; historico: HistoricoHorasEntry[] }> {
  const currentHoras = await getHorasData(chapa)
  const historico = await getHistoricoHorasData(chapa)
  return { currentHoras, historico }
}

/**
 * Server Action to handle the submission of 'número da chapa'.
 * Redirects to the horas-result page with the chapa as a query parameter.
 * @param formData The form data containing the 'chapa'.
 */
export async function submitChapa(formData: FormData) {
  const chapa = formData.get("chapa") as string
  if (!chapa) {
    return { error: "Número da Chapa é obrigatório." }
  }
  redirect(`/horas-result?chapa=${chapa}`)
}

/**
 * Server Action to handle the submission of 'ID'.
 * Redirects to the id-result page with chapa and id as query parameters.
 * @param formData The form data containing the 'chapa' (hidden) and 'id'.
 */
export async function submitID(formData: FormData) {
  const chapa = formData.get("chapa") as string // Retrieve chapa from hidden input
  const id = formData.get("id") as string
  if (!id) {
    return { error: "ID é obrigatório." }
  }
  redirect(`/id-result?chapa=${chapa}&id=${id}`)
}
