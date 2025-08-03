import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    await db.read();

    if (!db.data || !db.data.blogPosts) {
      return NextResponse.json(
        { error: "No blog posts found" },
        { status: 404 }
      );
    }

    const latest = db.data.blogPosts.find((post) => post.latestArticle === true);

    if (!latest) {
      return NextResponse.json(
        { error: "No latest article found" },
        { status: 404 }
      );
    }

    return NextResponse.json(latest, { status: 200 });
  } catch (error) {
    console.error("Error fetching latest article:", error);
    return NextResponse.json(
      { error: "Failed to fetch latest article" },
      { status: 500 }
    );
  }
}
