export default function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')  // Remove special chars
    .trim()
    .replace(/\s+/g, '-');         // Replace spaces with dashes
}
