import { NextResponse } from "next/server";

// Handles GET requests to fetch NASA APOD data
export async function GET(request) {
  console.log("Incoming request to /api/getNasaApod");

  // Step 1: Retrieve NASA API key
  const apiKey = process.env.NASA_API_KEY;
  if (!apiKey) {
    console.error(
      "NASA API key is missing. Please check your environment variables."
    );
    return NextResponse.json(
      { error: "Internal server error: NASA API key is missing" },
      { status: 500 }
    );
  }
  console.log("NASA API key successfully retrieved");

  // Step 2: Extract the date query parameter
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    console.error("Date parameter is missing in the request.");
    return NextResponse.json(
      { error: "Bad request: Date parameter is required." },
      { status: 400 }
    );
  }

  console.log(`Date received for APOD request: ${date}`);

  // Step 3: Construct NASA API URL with the provided date
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
  console.log(`NASA API request URL: ${url}`);

  try {
    // Step 4: Make the request to NASA's API
    const response = await fetch(url);
    console.log("Request made to NASA APOD API");

    // Step 5: Check if the response is OK (status 200–299)
    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(
        `NASA API responded with status ${response.status}: ${errorDetails}`
      );
      return NextResponse.json(
        { error: `Failed to fetch APOD data: ${errorDetails}` },
        { status: response.status }
      );
    }

    // Step 6: Parse the JSON data
    const data = await response.json();
    console.log("Successfully retrieved and parsed NASA APOD data:", data);

    // Step 7: Return the fetched data as a JSON response
    return NextResponse.json(data);
  } catch (error) {
    // Step 8: Catch any unexpected errors and log them
    console.error(
      "An unexpected error occurred while fetching APOD data:",
      error.message
    );
    console.error(error.stack);
    return NextResponse.json(
      { error: "Internal server error: Unable to fetch NASA APOD data" },
      { status: 500 }
    );
  }
}
