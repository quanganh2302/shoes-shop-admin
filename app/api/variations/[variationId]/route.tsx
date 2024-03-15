import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { variationId: string } }
) => {
  try {
    const body = await req.json();
    const { name, categoryId } = body;
    if (!name) {
      return new NextResponse("Variation name is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }
    if (!params.variationId) {
      return new NextResponse("Variation id is required", { status: 400 });
    }
    const variation = await prismadb.variation.updateMany({
      where: {
        id: params.variationId,
      },
      data: {
        name,
        categoryId,
      },
    });
    return NextResponse.json(variation);
  } catch (error) {
    console.log("[VARIATION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { variationId: string } }
) => {
  try {
    if (!params.variationId) {
      return new NextResponse("Variation id is required", { status: 401 });
    }
    const variation = await prismadb.variation.delete({
      where: { id: params.variationId },
    });
    return NextResponse.json(variation);
  } catch (error) {
    console.log("DELETE_VARIATION", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
