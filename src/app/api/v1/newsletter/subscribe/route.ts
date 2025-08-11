import { newsletter, newsletterSupabaseResponse } from "@/app/types/backend/newsletter.backend.types";
import { mapNewsLetterToSupabase } from "@/helpers/backend/db/mappers..db.backend";
import { getASingleDataFromSupabase, insertIntoSupabase } from "@/lib/supabase";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const data: newsletter = await req.json();

    // Here you would typically handle the subscription logic, e.g., save to a database
    // For demonstration, we just log the data and return a success response
    if (!data.email) {
      return new Response(JSON.stringify({ error: "Email is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    // First will check if the email is already subscribed
    const existingSubscription = await getASingleDataFromSupabase(
      "newsletter",
      data.email,
      "email"
    ) as newsletterSupabaseResponse;
    if (existingSubscription) {
      return new Response(
        JSON.stringify({ error: "Email is already subscribed." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const dataToSendToDatabase = {
        id: uuidv4(),
        email: data.email,
        timestamp: data.timestamp || new Date().toISOString(),
        source: data.source || "newsletter_signup",
        userAgent: data.userAgent,
        referrer: data.referrer
    }

    const transformedDataForSupabase = mapNewsLetterToSupabase(dataToSendToDatabase as newsletter);
    await insertIntoSupabase("newsletter", transformedDataForSupabase);

    return new Response(
      JSON.stringify({ message: "Subscription successful!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing subscription:", error);
    return new Response(JSON.stringify({ error: "Subscription failed." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
