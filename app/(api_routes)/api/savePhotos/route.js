import { put } from "@vercel/blob";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { nasaImageUrl, aiImageUrl, metadata } = body;

    // Step 1: Download the NASA image
    const nasaImageResponse = await fetch(nasaImageUrl);
    if (!nasaImageResponse.ok) throw new Error("Failed to download NASA image");
    const nasaImageBuffer = await nasaImageResponse.arrayBuffer();

    // Step 2: Download the AI-generated image
    const aiImageResponse = await fetch(aiImageUrl);
    if (!aiImageResponse.ok) throw new Error("Failed to download AI image");
    const aiImageBuffer = await aiImageResponse.arrayBuffer();

    // Step 3: Upload NASA image to Vercel Blob
    const nasaBlob = await put(
      `nasa-${metadata.date}.png`,
      Buffer.from(nasaImageBuffer),
      {
        access: "public",
        contentType: "image/png",
      }
    );

    // Step 4: Upload AI image to Vercel Blob
    const aiBlob = await put(
      `ai-${metadata.date}.png`,
      Buffer.from(aiImageBuffer),
      {
        access: "public",
        contentType: "image/png",
      }
    );

    // Step 5: Save the Blob URLs and metadata to PostgreSQL
    const newImagePair = await prisma.imagePair.create({
      data: {
        nasaImageUrl: nasaBlob.url,
        aiImageUrl: aiBlob.url,
        metadataTitle: metadata.title,
        metadataDate: new Date(metadata.date),
        metadataExplanation: metadata.explanation,
      },
    });

    // Return the saved image pair data
    return NextResponse.json(newImagePair);
  } catch (error) {
    console.error("Error in /api/savePhotos:", error);
    return NextResponse.json(
      { error: "Failed to save photos" },
      { status: 500 }
    );
  }
}
