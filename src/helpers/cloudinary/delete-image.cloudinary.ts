import getPublicIdFromCloudinaryUrl from "../get-public-id-from-cloudinary-url";

export default async function deleteImageFromCloudinary(
  url: string
): Promise<void> {
  try {
    const publicId = getPublicIdFromCloudinaryUrl(url);
    let response;
    if (publicId) {
      // if we do get a publicId, lets pass it to the backend to delete
      response = await fetch(`/api/v1/cloudinary`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });
    }
    if (!response || !response.ok) {
      throw new Error("Failed to delete image from Cloudinary");
    }
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "Failed to delete image from Cloudinary");
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw new Error("Failed to delete image from Cloudinary");
  }
}
