// lib/slugify.ts
export default function slugifyTitle(input: string, maxLen = 80) {
  return input
    .normalize("NFKD")                          // split accents
    .replace(/[\u0300-\u036f]/g, "")            // remove diacritics
    .toLowerCase()
    .replace(/&/g, " and ")                     // keep meaning of &
    .replace(/[^a-z0-9]+/g, "-")                // non-alnum → dash
    .replace(/^-+|-+$/g, "")                    // trim dashes
    .replace(/-{2,}/g, "-")                     // collapse dashes
    .slice(0, maxLen);                           // keep it short
}
