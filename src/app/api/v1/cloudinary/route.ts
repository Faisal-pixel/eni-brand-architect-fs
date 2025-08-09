import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    const { publicId, resource_type = "image" } = data;
    if (!publicId || typeof publicId !== "string") {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId, {
      invalidate: true, // we want to purge the cdn version of the image
      resource_type, // specify the resource type (image, video, etc.)
    });

    if (result.result !== "ok") {
        // result example: { result: "ok" } | { result: "not found" } | { result: "already deleted" }
      throw new Error(`Failed to delete image from Cloudinary ${result.result}`);
    }

    return NextResponse.json(
      { success: true, message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}