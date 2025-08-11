// Import types and utilities for working with individual careers and Supabase
import { NextResponse, NextRequest } from "next/server";
import { careersSupabaseResponse } from "@/app/types/backend/careers.backend.types";
import {
  mapCareerFromSupabase,
  mapCareerToSupabase,
} from "@/helpers/backend/db/mappers..db.backend";
import {
  deleteRecordFromSupabase,
  getASingleDataFromSupabase,
  updateARecordInSupabase,
} from "@/lib/supabase";

// GET a single career by ID
// This function fetches one specific job posting using its unique ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // STEP 1: Extract the career ID from the URL parameters
    // When someone visits /api/v1/careers/abc123, the ID is "abc123"
    const { id: careerId } = await params;

    // STEP 2: Get this specific career from Supabase database
    // This replaces the old "await db.read()" and finding in the array
    const career = await getASingleDataFromSupabase("careers", careerId);

    // STEP 3: Check if the career exists
    // If no career found with this ID, tell the user it doesn't exist
    if (!career) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    // STEP 4: Convert from Supabase format to frontend format and send response
    const mappedCareer = mapCareerFromSupabase(
      career as careersSupabaseResponse
    );
    return NextResponse.json(mappedCareer, { status: 200 });
  } catch (error) {
    // STEP 5: Handle any errors that occur
    console.error("Error fetching the career:", error);
    return NextResponse.json(
      { error: "Failed to fetch the career" },
      { status: 500 }
    );
  }
}

// PUT - Update an existing career
// This function allows editing/updating a job posting
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // STEP 1: Get the updated career data from the request body
    // This contains the new information the user wants to save
    const body = await req.json();

    // STEP 2: Extract the career ID from the URL
    const { id: careerId } = await params;

    // STEP 3: Check if the career exists before trying to update it
    const existingCareer = await getASingleDataFromSupabase(
      "careers",
      careerId
    );
    if (!existingCareer) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    // STEP 4: Convert the updated data to Supabase format
    // The body contains frontend format (camelCase), we need database format (snake_case)
    const mappedData = mapCareerToSupabase(body);

    // STEP 5: Update the career in Supabase database
    // This replaces the old method of finding index and updating the array
    const updatedData = await updateARecordInSupabase(
      "careers",
      mappedData,
      careerId
    );

    // STEP 6: Check if the update was successful
    if (!updatedData || !updatedData.length) {
      return NextResponse.json(
        { error: "Failed to update the career" },
        { status: 500 }
      );
    }

    // STEP 7: Convert the updated data back to frontend format and send response
    const responseData = mapCareerFromSupabase(
      updatedData[0] as careersSupabaseResponse
    );


    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    // STEP 8: Handle any errors during the update process
    console.error("Error updating career:", error);
    return NextResponse.json(
      { error: "Failed to update the career" },
      { status: 500 }
    );
  }
}

// DELETE a career posting
// This function removes a job posting from the database
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // STEP 1: Extract the career ID from the URL
    const { id: careerId } = await params;

    // STEP 2: Check if the career exists before trying to delete it
    // Get the career data so we can return it in the response (common practice)
    const dataToDelete = await getASingleDataFromSupabase("careers", careerId);
    if (!dataToDelete || !dataToDelete.id) {
      return NextResponse.json(
        { error: "Career to delete not found" },
        { status: 404 }
      );
    }

    // STEP 3: Log what we're about to delete (helpful for debugging)

    // STEP 4: Delete the career from Supabase database
    // This replaces the old method of using splice() to remove from array
    await deleteRecordFromSupabase("careers", careerId);

    // STEP 5: Convert to frontend format and return the deleted career data
    // This confirms to the user what was deleted
    const deletedCareer = mapCareerFromSupabase(
      dataToDelete as careersSupabaseResponse
    );
    return NextResponse.json(deletedCareer, { status: 200 });
  } catch (error) {
    // STEP 6: Handle any errors during deletion
    console.error("Error deleting career:", error);
    return NextResponse.json(
      { error: "Failed to delete career" },
      { status: 500 }
    );
  }
}
