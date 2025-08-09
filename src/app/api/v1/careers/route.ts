// Import types and utilities for working with careers and Supabase
import { careersSupabaseResponse } from "@/app/types/backend/careers.backend.types";
import {
  mapCareerFromSupabase,
  mapCareerToSupabase,
} from "@/helpers/backend/db/mappers..db.backend";
import { getDataFromSupabase, insertIntoSupabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// GET all careers from the database
// This function handles fetching all career listings with optional filtering and pagination
export async function GET(req: NextRequest) {
  try {
    // STEP 1: Get all careers data from Supabase database
    // This replaces the old "await db.read()" that was reading from db.json file
    const dataFromSupabase = await getDataFromSupabase("careers");

    // STEP 2: Check if we got any data back from the database
    // If no careers exist, return an empty response (this is normal for a new system)
    if (!dataFromSupabase || !dataFromSupabase.length) {
      return NextResponse.json(
        {
          careers: [], // Empty array means no careers found
          page: 1,
          totalPages: 0,
          totalNumberOfCareers: 0,
        },
        { status: 200 }
      );
    }

    // STEP 3: Get search parameters from the URL (like ?category=Engineering&page=2)
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category"); // Optional: filter by job category

    // STEP 4: Convert the Supabase data (snake_case) to our frontend format (camelCase)
    // This makes the data easier to work with in React components
    let careers = dataFromSupabase.map((career: careersSupabaseResponse) =>
      mapCareerFromSupabase(career)
    );

    // STEP 5: Filter careers by category if user requested it
    // Example: if user visits /api/v1/careers?category=Engineering, only show Engineering jobs
    if (category) {
      careers = careers.filter((career) => career.jobCategory === category);
    }
    // Before we paginate, we can ask them to pass in a paginate param, just in case they
    // want to see all careers without pagination and the default is to paginate
    const nopagination = searchParams.get("nopagination");
    // STEP 6: Handle pagination (breaking results into pages)
    // Get page number and limit from URL, with defaults if not provided
    if (!nopagination) {
      const page = parseInt(searchParams.get("page") || "1"); // Default to page 1
      const limit = parseInt(searchParams.get("limit") || "6"); // Default to 6 careers per page

      // Calculate which careers to show on this page
      const startIndex = (page - 1) * limit; // If page=2, limit=6, start at index 6
      const endIndex = startIndex + limit; // End at index 12

      // Get only the careers for this page
      const paginatedCareers = careers.slice(startIndex, endIndex);
      const totalNumberOfCareers = careers.length;
      const totalPages = Math.ceil(totalNumberOfCareers / limit);

      // STEP 7: Send the response back to the frontend
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

    // If no pagination is requested, just return all careers
    return NextResponse.json(
      {
        careers,
        page: 1, // No pagination means page 1
        totalPages: 1, // No pagination means only one page
        totalNumberOfCareers: careers.length,
      },
      { status: 200 }
    );
  } catch (error) {
    // STEP 8: Handle any errors that occur during the process
    console.error("Error fetching careers | server:", error);
    return NextResponse.json(
      { error: "Failed to fetch careers | server" },
      { status: 500 }
    );
  }
}

// POST - Create a new career listing
// This function handles adding new job postings to the database
export async function POST(req: NextRequest) {
  try {
    // STEP 1: Get the job data from the request body (sent from frontend form)
    const body = await req.json();

    // STEP 2: Validate that all required fields are provided
    // If any required field is missing, send an error back to the user
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

    // STEP 3: Extract the job details from the request body
    const { jobTitle, jobType, jobCategory, shortJobBrief, linkToApply } = body;

    // STEP 4: Create a new career object with auto-generated ID and current date
    const newCareer = {
      id: uuidv4(), // Generate a unique ID like "abc123-def456-ghi789"
      jobTitle, // The job title (e.g., "Software Engineer")
      jobType, // Full-time, Part-time, etc.
      jobCategory, // Engineering, Marketing, etc.
      shortJobBrief, // Brief description of the job
      datePosted: new Date().toISOString(), // Current date and time
      linkToApply, // URL where people can apply
    };

    // STEP 5: Convert our frontend format to Supabase format and save to database
    // This replaces the old db.update() and db.write() that worked with db.json
    const mappedData = mapCareerToSupabase(newCareer);
    const insertedData = await insertIntoSupabase("careers", mappedData);

    // STEP 6: Check if the insertion was successful
    if (!insertedData || !insertedData.length) {
      return NextResponse.json(
        { error: "Failed to insert new career" },
        { status: 500 }
      );
    }

    // STEP 7: Send the newly created career back to the frontend
    return NextResponse.json(insertedData[0], { status: 201 });
  } catch (error) {
    // STEP 8: Handle any errors during career creation
    console.error("Error creating career:", error);
    return NextResponse.json(
      { error: "Failed to create career" },
      { status: 500 }
    );
  }
}
