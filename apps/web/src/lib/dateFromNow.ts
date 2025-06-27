import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
/**
 * Formats a date to a human-readable string indicating the time elapsed from now.
 * @param date - The date to format, can be a Date object or a string representing a date.
 * @returns A string representing the time elapsed from now, e.g., "2 days ago".
 */
export function dateFromNow(date: Date | string): string {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ptBR,
  })
}
