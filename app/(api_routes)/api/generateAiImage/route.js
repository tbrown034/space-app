import { NextResponse } from "next/server";
import OpenAI from "openai";

// Handles POST requests to generate an AI image
export async function POST(request) {
  console.log("Incoming request to /api/generateAiImage");

  // Step 1: Retrieve OpenAI API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error(
      "OpenAI API key is missing. Please check your environment variables."
    );
    return NextResponse.json(
      { error: "Internal server error: OpenAI API key is missing" },
      { status: 500 }
    );
  }
  console.log("OpenAI API key successfully retrieved");

  // Step 2: Parse and validate request payload
  let metadata;
  try {
    const body = await request.json();
    metadata = body.metadata;

    if (
      !metadata ||
      !metadata.title ||
      !metadata.explanation ||
      !metadata.date
    ) {
      throw new Error("Invalid metadata: Missing required fields");
    }
  } catch (error) {
    console.error("Error parsing request payload:", error.message);
    return NextResponse.json(
      { error: "Bad request: Invalid metadata" },
      { status: 400 }
    );
  }
  console.log("Metadata received:", metadata);

  // Step 3: Set up OpenAI with API key
  const openai = new OpenAI({ apiKey });

  // Step 4: Build prompt for AI generation, truncating metadata if too long
  const title = metadata.title.slice(0, 100); // Limit title to 100 characters
  const explanation = metadata.explanation.slice(0, 500); // Limit explanation to 500 characters

  const prompt = `
    Generate an AI image inspired by NASA's Astronomy Picture of the Day (APOD) for an educational game. The image should replicate NASA's style and make it hard to distinguish from real APOD images.

    Use the following metadata:
    - **Title**: "${title}"
    - **Explanation**: "${explanation}" (truncated for brevity)
    - **Date**: ${metadata.date}
    ${metadata.copyright ? `- **Image Credit**: ${metadata.copyright}` : ""}

    Guidelines:
    1. **Adapt to Content**: If it's an Earth-based photograph, mimic realistic landscapes, atmospheric events, or natural phenomena. For space-related content, generate detailed cosmic scenes with stars, nebulae, or celestial bodies. For scientific data visualizations, maintain realism with plausible representations.
    2. **Style and Realism**: The image should feel scientifically accurate and visually plausible, as if captured by a telescope or satellite.
    3. **Avoid Text**: Do not include any text or labels within the image.
    4. **Square Format**: Ensure the image fits a 1024x1024 resolution.
    5. **Realism and Accuracy**: Make sure the generated image mimics the level of realism found in NASA APOD images.

    The goal is to create an image that users would struggle to distinguish from a real NASA APOD.
  `;

  console.log("Generated prompt for AI image:", prompt);

  // Step 5: Generate AI image using OpenAI's DALL·E 3
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    // Extract image URL from response
    const imageUrl = response.data[0].url;
    console.log("AI image generated successfully:", imageUrl);

    // Step 6: Return the generated image URL as a JSON response
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Error generating AI image:", error);
    return NextResponse.json(
      { error: "Failed to generate AI image" },
      { status: 500 }
    );
  }
}
