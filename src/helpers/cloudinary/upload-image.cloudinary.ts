const uploadImageToCloudinary = async (file: File): Promise<string> => {
  try {
    const signedResponse = await fetch("/api/v1/cloudinary-sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: file.name }),
    });
    const signedData = await signedResponse.json();

    // Prepare the data for cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", signedData.apiKey);
    formData.append("timestamp", signedData.timestamp);
    formData.append("signature", signedData.signature);
    formData.append("folder", signedData.folder);
    formData.append("public_id", signedData.publicId);

    // Upload to cloudinary
    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${signedData.cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadData = await uploadResponse.json();
    if (!uploadResponse.ok) {
      throw new Error(uploadData.error?.message || "Failed to upload image");
    }

    return uploadData.secure_url; // Use the secure URL from Cloudinary
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
};

export default uploadImageToCloudinary;