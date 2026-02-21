import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/square";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json({ products: [], query, total: 0 });
  }

  try {
    const products = await searchProducts(query);
    return NextResponse.json({
      products,
      query,
      total: products.length,
    });
  } catch {
    return NextResponse.json(
      { products: [], query, total: 0 },
      { status: 500 }
    );
  }
}
