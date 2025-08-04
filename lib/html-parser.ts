import type { HorasEntry, IDEntry, HistoricoHorasEntry } from "./types"

/**
 * Parses the HTML content of horas.html and extracts employee data.
 * @param htmlContent The HTML string from horas.html.
 * @returns An array of HorasEntry objects.
 */
export async function parseHorasHtml(htmlContent: string): Promise<HorasEntry[]> {
  const rows: HorasEntry[] = []
  console.log("parseHorasHtml: Conteúdo HTML recebido (primeiros 500 caracteres):", htmlContent.substring(0, 500))

  const tbodyMatch = htmlContent.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i)
  if (!tbodyMatch || !tbodyMatch[1]) {
    console.error("parseHorasHtml: Não foi possível encontrar tbody. Conteúdo HTML completo recebido:", htmlContent)
    return []
  }

  const tbodyContent = tbodyMatch[1]
  console.log("parseHorasHtml: Conteúdo do tbody (primeiros 500 caracteres):", tbodyContent.substring(0, 500))

  const trMatches = tbodyContent.match(/<tr[^>]*>(.*?)<\/tr>/gs)

  if (!trMatches) {
    console.warn("parseHorasHtml: Nenhuma tag <tr> encontrada dentro do tbody.")
    return []
  }

  for (const tr of trMatches) {
    const tdMatches = tr.match(/<td[^>]*>(.*?)<\/td>/gs)
    // Agora esperamos 9 colunas: chapa, nome, funcao, lider, turno, status, horasPositivas, horasNegativas, saldoFinalHoras
    if (tdMatches && tdMatches.length >= 9) {
      const chapa = tdMatches[0].replace(/<\/?td[^>]*>/g, "").trim()
      const nome = tdMatches[1].replace(/<\/?td[^>]*>/g, "").trim()
      const funcao = tdMatches[2].replace(/<\/?td[^>]*>/g, "").trim()
      const lider = tdMatches[3].replace(/<\/?td[^>]*>/g, "").trim()
      const turno = tdMatches[4].replace(/<\/?td[^>]*>/g, "").trim()
      const status = tdMatches[5].replace(/<\/?td[^>]*>/g, "").trim()
      const horasPositivas = tdMatches[6].replace(/<\/?td[^>]*>/g, "").trim()
      const horasNegativas = tdMatches[7].replace(/<\/?td[^>]*>/g, "").trim()
      const saldoFinalHoras = tdMatches[8].replace(/<\/?td[^>]*>/g, "").trim()
      rows.push({ chapa, nome, funcao, lider, turno, status, horasPositivas, horasNegativas, saldoFinalHoras })
      console.log(`parseHorasHtml: Chapa: ${chapa}, Função extraída: "${funcao}"`) // Novo log
    }
  }
  console.log(`parseHorasHtml: ${rows.length} linhas de dados de horas extras extraídas.`)
  return rows
}

/**
 * Parses the HTML content of ID.html and extracts identification data.
 * @param htmlContent The HTML string from ID.html.
 * @returns An array of IDEntry objects.
 */
export async function parseIDHtml(htmlContent: string): Promise<IDEntry[]> {
  const rows: IDEntry[] = []
  console.log("parseIDHtml: Conteúdo HTML recebido (primeiros 500 caracteres):", htmlContent.substring(0, 500))

  const tbodyMatch = htmlContent.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i)
  if (!tbodyMatch || !tbodyMatch[1]) {
    console.error("parseIDHtml: Não foi possível encontrar tbody. Conteúdo HTML completo recebido:", htmlContent)
    return []
  }

  const tbodyContent = tbodyMatch[1]
  console.log("parseIDHtml: Conteúdo do tbody (primeiros 500 caracteres):", tbodyContent.substring(0, 500))

  const trMatches = tbodyContent.match(/<tr[^>]*>(.*?)<\/tr>/gs)

  if (!trMatches) {
    console.warn("parseIDHtml: Nenhuma tag <tr> encontrada dentro do tbody.")
    return []
  }

  for (const tr of trMatches) {
    const tdMatches = tr.match(/<td[^>]*>(.*?)<\/td>/gs)
    if (tdMatches && tdMatches.length >= 3) {
      const chapa = tdMatches[0].replace(/<\/?td[^>]*>/g, "").trim()
      const id = tdMatches[1].replace(/<\/?td[^>]*>/g, "").trim()
      const nome = tdMatches[2].replace(/<\/?td[^>]*>/g, "").trim()
      rows.push({ chapa, id, nome })
    }
  }
  console.log(`parseIDHtml: ${rows.length} linhas de dados de ID extraídas.`)
  return rows
}

/**
 * Parses the HTML content of historico-horas.html and extracts historical hours data.
 * @param htmlContent The HTML string from historico-horas.html.
 * @returns An array of HistoricoHorasEntry objects.
 */
export async function parseHistoricoHorasHtml(htmlContent: string): Promise<HistoricoHorasEntry[]> {
  const rows: HistoricoHorasEntry[] = []
  console.log(
    "parseHistoricoHorasHtml: Conteúdo HTML recebido (primeiros 500 caracteres):",
    htmlContent.substring(0, 500),
  )

  const tbodyMatch = htmlContent.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i)
  if (!tbodyMatch || !tbodyMatch[1]) {
    console.error(
      "parseHistoricoHorasHtml: Não foi possível encontrar tbody. Conteúdo HTML completo recebido:",
      htmlContent,
    )
    return []
  }

  const tbodyContent = tbodyMatch[1]
  console.log("parseHistoricoHorasHtml: Conteúdo do tbody (primeiros 500 caracteres):", tbodyContent.substring(0, 500))

  const trMatches = tbodyContent.match(/<tr[^>]*>(.*?)<\/tr>/gs)

  if (!trMatches) {
    console.warn("parseHistoricoHorasHtml: Nenhuma tag <tr> encontrada dentro do tbody.")
    return []
  }

  for (const tr of trMatches) {
    const tdMatches = tr.match(/<td[^>]*>(.*?)<\/td>/gs)
    // Esperamos 5 colunas: chapa, periodo, horasPositivas, horasNegativas, saldoFinalHoras
    if (tdMatches && tdMatches.length >= 5) {
      const chapa = tdMatches[0].replace(/<\/?td[^>]*>/g, "").trim()
      const periodo = tdMatches[1].replace(/<\/?td[^>]*>/g, "").trim()
      const horasPositivas = tdMatches[2].replace(/<\/?td[^>]*>/g, "").trim()
      const horasNegativas = tdMatches[3].replace(/<\/?td[^>]*>/g, "").trim()
      const saldoFinalHoras = tdMatches[4].replace(/<\/?td[^>]*>/g, "").trim()
      rows.push({ chapa, periodo, horasPositivas, horasNegativas, saldoFinalHoras })
    }
  }
  console.log(`parseHistoricoHorasHtml: ${rows.length} linhas de dados de histórico de horas extraídas.`)
  return rows
}
