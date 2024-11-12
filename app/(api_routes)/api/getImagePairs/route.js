import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const imagePairs = await prisma.imagePair.findMany({
      orderBy: { metadataDate: "desc" },
    });
    return NextResponse.json(imagePairs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch image pairs" },
      { status: 500 }
    );
  }
}
