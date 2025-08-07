import { blogPostsSupabaseResponse } from "@/app/types/backend/blog-post.backend.types";
import {
  mapBlogPostFromSupabase,
  mapBlogPostToSupabase,
} from "@/helpers/backend/db/mappers..db.backend";
import {
  getDataFromSupabase,
  insertIntoSupabase,
  updateARecordInSupabase,
} from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Its gonna be a GET handler.
// Trying to get all the posts in the database
// So we first need to read
// Then we have to check if the data actually exists or if the blogPosts actually exist
// If they dont, we want to return an empty array (we cant return an empty array because we know if
// we are getting all posts, if they hit the route and it doesnt exist, thenwe just need to let them
// know that is is empty)
// If it does exist then we want to return
// Also when they want to filter for posts based on their category, we should allow to pass through the parameter
// So like ?category="inspiration";

export async function GET(req: NextRequest) {
  try {
    const dataFromPgTable = await getDataFromSupabase("blogs");
    if (!dataFromPgTable || !dataFromPgTable.length) {
      return NextResponse.json(
        {
          posts: [],
          page: 1,
          totalPages: 0,
          totalPosts: 0,
        },
        { status: 200 }
      ); // Return an empty array
    }

    // let consider for paramse, like filter filtering for categoriies

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let posts = dataFromPgTable.map((post: blogPostsSupabaseResponse) =>
      mapBlogPostFromSupabase(post)
    );
    if (category) {
      posts = posts.filter((post) => post.category === category);
    }

    // We are doing the pagination here because we want to also have pagination even when the user
    // Filters by category
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedPosts = posts.slice(startIndex, endIndex);
    const totalNumberOfPosts = posts.length;
    const totalPages = Math.ceil(totalNumberOfPosts / limit);
    return NextResponse.json(
      {
        posts: paginatedPosts,
        page,
        totalPages,
        totalNumberOfPosts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blog posts | server:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts | server" },
      { status: 500 }
    );
  }
}

// Now for the POST
// What do we want to do:
/**
 * They will pass it through the body, how do we get the body of a request in nextjs
 * When we do get the body, we want to build the post to fit the way we save data inthe database
 * so we will need to generate a random uuid for the blog post basically.
 * Then for the latestArticle, since we are creating a new post, we can just set it to true.
 * We will also need to map through the other posts to set the latestArticle to false
 * Then we can just push into the database.
 *
 * send a status
 */

export async function POST(req: NextRequest) {
  // All we need category, title, description, author?, authorAvatar?, image, content
  // We will set the id and latestArticle by ourself here.
  try {
    const body = await req.json();
    if (
      !body ||
      !body.category ||
      !body.title ||
      !body.description ||
      !body.imageUrl ||
      !body.content
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const { category, date, title, description, imageUrl, content } = body;

    const newPost = {
      id: uuidv4(),
      category,
      title,
      description,
      author: "eba",
      authorAvatar: "eba-logo",
      date,
      imageUrl,
      content,
      latestArticle: true,
    };

    // STEP 1: First, set all existing posts' latestArticle to false
    const currentPosts = await getDataFromSupabase("blogs");
    if (currentPosts && currentPosts.length > 0) {
      // Update all existing posts to set latestArticle = false
      const updatePromises = currentPosts.map(
        async (post: blogPostsSupabaseResponse) => {
          if (post.latest_article === true && post.id) {
            const updatedPost = { ...post, latest_article: false };
            return updateARecordInSupabase("blogs", updatedPost, post.id);
          }
          return Promise.resolve();
        }
      );

      // Wait for all updates to complete
      await Promise.all(updatePromises);
    }

    // STEP 2: Insert the new post with latestArticle = true
    const mappedData = mapBlogPostToSupabase(newPost);
    const insertedData = await insertIntoSupabase("blogs", mappedData);
    if (!insertedData || !insertedData.length) {
      return NextResponse.json(
        { error: "Failed to insert new post" },
        { status: 500 }
      );
    }

    return NextResponse.json(insertedData[0], { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
