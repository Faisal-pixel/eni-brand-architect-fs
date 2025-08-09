export default function getPublicIdFromCloudinaryUrl(
  url: string
): string | null {
  // split by /upload/
  const parts = url.split("/upload/")[1]; // "v1754585792/blogs/cover_images/ddl%3Bd_1754585787593.jpg"
  const withoutVersion = parts.replace(/^v[0-9]+\/?/, ""); // remove "v1754585792/"
  const withoutExtension = withoutVersion.replace(/\.[^/.]+$/, ""); // remove file extension
  return decodeURIComponent(withoutExtension); // decode %3B into ;
}
