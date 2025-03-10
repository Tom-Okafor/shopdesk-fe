import { NextRequest, NextResponse } from "next/server";

interface Body {
  name: string;
  quantity: number;
  product_id: string;
  organization_id: string;
  buying_price: number;
  currency_code: string;
}
export async function POST(request: NextRequest) {
  const baseUrl = `https://api.timbu.cloud/stocks`;
  const token = request.headers.get("Authorization");
  if (!token || !token.startsWith("Bearer "))
    return NextResponse.json(
      {
        error: "Invalid or Missing Authorization Token",
      },
      {
        status: 401,
      }
    );
  try {
    const body = await request.json();
    const validation = validateRequestBody(body);
    if (validation)
      return NextResponse.json(
        {
          error: validation,
        },
        { status: 400 }
      );
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok)
      return NextResponse.json(
        { error: "Failed to create stock. Status: " + response.status },
        { status: response.status }
      );
    return NextResponse.json(await response.json(), { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Stack Error",
      },
      {
        status: 500,
      }
    );
  }
}

function validateRequestBody(body: Body): string | null {
  if (!body.name) return "Missing or Invalid Stock Name";
  if (!body.quantity) return "Quantity is required";
  if (!body.product_id) return "Product ID is required";
  if (!body.organization_id) return "Organization ID is required";
  if (!body.buying_price || !body.currency_code)
    return "Buying price and currency code are required";
  return null;
}
