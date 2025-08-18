import { deleteMultipleRows } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const BodySchema = z.object({
  ids: z.array(z.string().min(1)).min(1)
});

export async function POST(request: NextRequest) {
    try {

        const json = await request.json();
        console.log("Json",json)
        const parsed = BodySchema.safeParse(json);
        if(!parsed.success) {
            return NextResponse.json({ error: 'ids array is required'}, {status: 400});
        }

        const { ids } = parsed.data;

        const data = await deleteMultipleRows("blogs", ids);
        console.log ("Deleted data from supabase: ", data)
        const deletedPosts = data.map((post) => (post.id));
        console.log("Deleted posts: ", deletedPosts);
        return NextResponse.json({ deleted: deletedPosts }, { status: 200 });

    } catch (error) {
        console.error("Error in bulk delete route:", error);
        return NextResponse.json({ error: "Failed to fetch blog posts | server"  }, { status: 500 });
    }
}