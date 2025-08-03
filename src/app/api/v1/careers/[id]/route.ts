import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.read();
    const careerId = await params.id;
    const career = db.data?.careers.find((career) => career.id === careerId);
    if (!career) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }
    return NextResponse.json(career, { status: 200 });
  } catch (error) {
    console.error("Error fetching the career:", error);
    return NextResponse.json(
      { error: "Failed to fetch the career" },
      { status: 500 }
    );
  }
}

// PUT REQUEST

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {

  try {
    await db.read();
    const body = await req.json();
    const { id: careerId } = await params;

    const careerIndex = db.data?.careers.findIndex(
      (career) => career.id === careerId
    );

    if (careerIndex === -1 || careerIndex === undefined) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    db.data!.careers[careerIndex] = {
      ...db.data?.careers[careerIndex],
      ...body,
    };

    await db.write();

    return NextResponse.json(db.data!.careers[careerIndex], { status: 200 });
  } catch (error) {
    console.error("Error fetching careers:", error);
    return NextResponse.json(
      { error: "Failed to update the career" },
      { status: 500 }
    );
  }
}

// DELETE a career

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {

  try {
    await db.read();
    const {id: careerId}  = await params;
    const careers = db.data?.careers;
    const careerToDeleteIndex = careers.findIndex(c => c.id === careerId);

    if(careerToDeleteIndex === -1 || careerToDeleteIndex === undefined) {
        return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }
    /**
     * The below basically mutate the careers array and removes items from an array. So i am
     * saying, remove the elemenet at careerToDeleteIndex, and only 1 item, and since it returns an
     * arrya and we are only removing one item, we can just use [0] tp select it
     */
    const deletedCareer = careers.splice(careerToDeleteIndex, 1)[0];
    await db.write();
    return NextResponse.json(deletedCareer, {status: 200})
  } catch (error) {
    console.error("Error fetching careers:", error);
    return NextResponse.json(
      { error: "Failed to fetch careers" },
      { status: 500 }
    );
  }
}
