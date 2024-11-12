import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Step 1: Get the total count of ImagePairs in the database
    const count = await prisma.imagePair.count();
    if (count === 0) {
      return NextResponse.json(
        { error: "No image pairs available" },
        { status: 404 }
      );
    }

    // Step 2: Generate a random index based on the total count
    const randomIndex = Math.floor(Math.random() * count);

    // Step 3: Fetch a random ImagePair entry
    const randomPair = await prisma.imagePair.findFirst({
      skip: randomIndex,
      take: 1,
    });

    // Step 4: Return the random ImagePair data
    return NextResponse.json({
      nasaImageUrl: randomPair.nasaImageUrl,
      aiImageUrl: randomPair.aiImageUrl,
      metadata: {
        title: randomPair.metadataTitle,
        date: randomPair.metadataDate,
        explanation: randomPair.metadataExplanation,
      },
    });
  } catch (error) {
    console.error("Error fetching random image pair:", error);
    return NextResponse.json(
      { error: "Failed to fetch random image pair" },
      { status: 500 }
    );
  }
}
