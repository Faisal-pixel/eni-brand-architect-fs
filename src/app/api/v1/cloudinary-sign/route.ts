import slugifyTitle from "@/helpers/slugify-blog-titles-for-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data || !data.title) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const timestamp = Math.round(new Date().getTime() / 1000);
    const safeSlug = slugifyTitle(data.title);
    const publicId = `${safeSlug}_${Date.now()}`;

    // Params for signature
    const params = {
      timestamp,
      folder: "blogs/cover_images", // Folder where images will be uploaded
      public_id: publicId,
    };

    // Generate signature
    const signature = cloudinary.utils.api_sign_request(
      params,
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json(
      {
        timestamp,
        signature,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        folder: "blogs/cover_images", // Folder where images will be uploaded
        publicId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating Cloudinary signature:", error);
    return NextResponse.json(
      { error: "Failed to generate Cloudinary signature" },
      { status: 500 }
    );
  }
}
