export function generateSlug(text: string): string {
  return text
    .normalize('NFD') // Remove acentos
    .replace(/[\u0300-\u036f]/g, '') // Remove marcas de acento
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Substitui grupos de caracteres não alfanuméricos por hífen
    .replace(/^-+|-+$/g, '') // Remove hífens do início e fim
}
