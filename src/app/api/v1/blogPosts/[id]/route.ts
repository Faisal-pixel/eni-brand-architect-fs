import { NextResponse, NextRequest } from "next/server";
import { deleteRecordFromSupabase, getASingleDataFromSupabase, getDataFromSupabase, updateARecordInSupabase } from "@/lib/supabase";
import { mapBlogPostToSupabase } from "@/helpers/backend/db/mappers..db.backend";

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
    return NextResponse.json(post, { status: 200 });
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

    const updatedData = await updateARecordInSupabase("blogs", mappedData, postId);
    if (!updatedData || !updatedData.length) {
      return NextResponse.json(
        { error: "Failed to update the post" },
        { status: 500 }
      );
    }

    console.log("Updated data:", updatedData);

    return NextResponse.json(updatedData[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to update the post" },
      { status: 500 }
    );
  }
}

// DELETE a blog post

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    
    
    const { id: postId } = await params;
    const dataFromPgTable = await getASingleDataFromSupabase("blogs", postId);
    if(!dataFromPgTable || !dataFromPgTable.id) {
      return NextResponse.json({ error: "Post to delete not found" }, { status: 404 });
    }
    console.log("Data from PG table to delete:", dataFromPgTable);
    await deleteRecordFromSupabase("blogs", postId);
    

    /**
     * The below basically mutate the blogPosts array and removes items from an array. So i am
     * saying, remove the elemenet at postToDeleteIndex, and only 1 item, and since it returns an
     * arrya and we are only removing one item, we can just use [0] tp select it
     */
    // const deletedPost = blogPosts.splice(postToDeleteIndex, 1)[0];
    // await db.write();
    return NextResponse.json(dataFromPgTable, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
