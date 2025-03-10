import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const baseUrl = "https://api.timbu.cloud/products";
  const searchParams = request.nextUrl.searchParams;
  const queryParameter = searchParams.get("organization_id");
  const token = request.headers.get("Authorization");
  if (!queryParameter)
    return NextResponse.json(
      {
        error: "Organization ID is required",
      },
      { status: 400 }
    );
  if (!token || !token.startsWith("Bearer "))
    return NextResponse.json(
      {
        error: "Invalid or missing authorization token",
      },
      { status: 401 }
    );
  try {
    const response = await fetch(
      `${baseUrl}?organization_id=${queryParameter}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    if (!response.ok)
      return NextResponse.json({
        error: "Failed to fetch products. Status: " + response.status,
        status: response.status,
      });
    const products = await response.json();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
