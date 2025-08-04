import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a time string (e.g., "+10:30", "-02:00") to a number of hours.
 * Handles positive and negative signs.
 * @param timeString The time in "HH:MM" format with optional sign.
 * @returns The time in hours as a number.
 */
export function parseTime(timeString: string): number {
  if (!timeString) return 0

  const sign = timeString.startsWith("-") ? -1 : 1
  const cleanString = timeString.replace(/[+-]/g, "") // Remove + or -
  const parts = cleanString.split(":")

  if (parts.length !== 2) {
    console.warn(`parseTime: Formato de tempo inválido: ${timeString}`)
    return 0
  }

  const hours = Number.parseInt(parts[0], 10)
  const minutes = Number.parseInt(parts[1], 10)

  if (isNaN(hours) || isNaN(minutes)) {
    console.warn(`parseTime: Erro ao analisar horas ou minutos: ${timeString}`)
    return 0
  }

  return sign * (hours + minutes / 60)
}
