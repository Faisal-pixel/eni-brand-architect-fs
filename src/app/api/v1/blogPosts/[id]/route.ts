import { NextResponse, NextRequest } from "next/server";
import {
  deleteRecordFromSupabase,
  getASingleDataFromSupabase,
  getDataFromSupabase,
  updateARecordInSupabase,
} from "@/lib/supabase";
import { mapBlogPostFromSupabase, mapBlogPostToSupabase } from "@/helpers/backend/db/mappers..db.backend";
import { v2 as cloudinary } from "cloudinary";
import { blogPostsSupabaseResponse } from "@/app/types/backend/blog-post.backend.types";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;
    const post = await getASingleDataFromSupabase("blogs", postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const mappedPost = mapBlogPostFromSupabase(post);
    return NextResponse.json(mappedPost, { status: 200 });
  } catch (error) {
    console.error("Error fetching the post:", error);
    return NextResponse.json(
      { error: "Failed to fetch the post" },
      { status: 500 }
    );
  }
}

// PUT REQUEST

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // First thing, we want to extract the body

  // Then we want to read the database

  // Then we want to find the index of the blog post we trying to edit

  // Then we do, we can use that to select it from the blogPosts array and then using the spread
  // operator, we pass in the previous data and then pass in the body as the new update

  try {
    const dataFromPgTable = await getDataFromSupabase("blogs");
    if (!dataFromPgTable || !dataFromPgTable.length) {
      return NextResponse.json(
        { error: "No blog posts found" },
        { status: 404 }
      );
    }
    const body = await req.json();
    const { id: postId } = await params;

    const postIndex = dataFromPgTable.findIndex((post) => post.id === postId);

    if (postIndex === -1 || postIndex === undefined) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const mappedData = mapBlogPostToSupabase(body);

    const updatedData = await updateARecordInSupabase(
      "blogs",
      mappedData,
      postId
    );
    if (!updatedData || !updatedData.length) {
      return NextResponse.json(
        { error: "Failed to update the post" },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedData[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to update the post" },
      { status: 500 }
    );
  }
}

// DELETE a blog post and its associated Cloudinary image

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;

    // First, get the blog post data to extract the image URL for Cloudinary deletion
    const dataFromPgTable = await getASingleDataFromSupabase("blogs", postId) as blogPostsSupabaseResponse;
    if (!dataFromPgTable || !dataFromPgTable.id) {
      return NextResponse.json(
        { error: "Post to delete not found" },
        { status: 404 }
      );
    }

    /**
     * STEP 1: Delete the associated image from Cloudinary
     * Extract the public_id from the Cloudinary URL to delete the image
     * Cloudinary URLs follow this pattern: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}.{format}
     * We need to extract the public_id from the imageUrl to delete it
     */
    if (dataFromPgTable.image_url) {
      try {
        // Extract public_id from Cloudinary URL
        // Expected URL format: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/blogs/cover_images/some_image_name.jpg
        const urlParts = dataFromPgTable.image_url.split("/");
        const uploadIndex = urlParts.indexOf("upload");

        if (uploadIndex !== -1 && uploadIndex + 2 < urlParts.length) {
          // Get everything after 'upload/v{version}/' or 'upload/' and remove file extension
          let publicId = urlParts.slice(uploadIndex + 2).join("/");

          // Remove file extension if present
          const lastDotIndex = publicId.lastIndexOf(".");
          if (lastDotIndex !== -1) {
            publicId = publicId.substring(0, lastDotIndex);
          }

          // Delete the image from Cloudinary
          const cloudinaryResult = await cloudinary.uploader.destroy(publicId);

          if (
            cloudinaryResult.result !== "ok" &&
            cloudinaryResult.result !== "not found"
          ) {
            console.warn(
              "Failed to delete image from Cloudinary:",
              cloudinaryResult
            );
            // Continue with blog post deletion even if image deletion fails
          }
        } else {
          console.warn(
            "Could not extract public_id from Cloudinary URL:",
            dataFromPgTable.image_url
          );
        }
      } catch (cloudinaryError) {
        console.error("Error deleting image from Cloudinary:", cloudinaryError);
        // Continue with blog post deletion even if image deletion fails
      }
    }

    /**
     * STEP 2: Delete the blog post from the database
     * Remove the blog post record from Supabase after successfully deleting the image
     */
    await deleteRecordFromSupabase("blogs", postId);

    /**
     * Legacy code comment: The below was used with lowdb to mutate the blogPosts array
     * and remove items from an array. We were saying, remove the element at postToDeleteIndex,
     * and only 1 item, and since it returns an array and we are only removing one item,
     * we could just use [0] to select it
     */
    // const deletedPost = blogPosts.splice(postToDeleteIndex, 1)[0];
    // await db.write();

    return NextResponse.json(
      {
        message: "Blog post and associated image deleted successfully",
        deletedPost: mapBlogPostFromSupabase(dataFromPgTable),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
