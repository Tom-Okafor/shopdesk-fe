import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const BASE_URL = "https://api.timbu.cloud";
  const token = req.headers.get("Authorization");
  if (!token) {
    return NextResponse.json({
      error: "Unauthorized. No access token provided.",
      status: 401,
    });
  }
  try {
    const response = await fetch(`${BASE_URL}/organizations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    if (!response.ok) {
      return NextResponse.json({
        error: `Failed to fetch organizations. Status: ${response.status}`,
        status: response.status,
      });
    }
    const data = await response.json();
    console.log(NextResponse.json(data));
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message, status: 500 });
    } else {
      return NextResponse.json({ error: "Internal Server Error", status: 500 });
    }
  }
}
