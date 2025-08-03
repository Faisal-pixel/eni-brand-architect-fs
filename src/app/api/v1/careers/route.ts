import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";



export async function GET(req: NextRequest) {
  await db.read();

  if (!db.data || !db.data.careers) {
    return NextResponse.json(
      {
        careers: [],
        page: 1,
        totalPages: 0,
        totalPosts: 0,
      },
      { status: 200 }
    ); 
  }


  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  let careers = db.data.careers;
  if (category) {
    careers = careers.filter((career) => career.jobCategory === category);
  }

  // We are doing the pagination here because we want to also have pagination even when the user
  // Filters by category
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedCareers = careers.slice(startIndex, endIndex);
  const totalNumberOfCareers = careers.length;
  const totalPages = Math.ceil(totalNumberOfCareers / limit);

  return NextResponse.json(
    {
      careers: paginatedCareers,
      page,
      totalPages,
      totalNumberOfCareers,
    },
    { status: 200 }
  );
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (
      !body ||
      !body.jobTitle ||
      !body.jobType ||
      !body.jobCategory ||
      !body.shortJobBrief ||
      !body.linkToApply
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const { jobTitle, jobType, jobCategory, shortJobBrief, linkToApply } = body;

    const newCareer = {
      id: uuidv4(),
      jobTitle,
      jobType,
      jobCategory,
      shortJobBrief,
      datePosted: new Date().toISOString(),
      linkToApply
    };

    db.update(({ careers }) => {
      careers.push(newCareer);
      return careers;
    });

    await db.write();

    return NextResponse.json(newCareer, { status: 201 });
  } catch (error) {
    console.error("Error creating career:", error);
    return NextResponse.json(
      { error: "Failed to create career" },
      { status: 500 }
    );
  }
}