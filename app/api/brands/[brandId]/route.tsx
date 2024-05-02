import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { brandId: string } }
) => {
  try {
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return new NextResponse("Brand name is required", { status: 400 });
    }

    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }
    const brand = await prismadb.brand.updateMany({
      where: {
        id: params.brandId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(brand);
  } catch (error) {
    console.log("[brand_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { brandId: string } }
) => {
  try {
    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 401 });
    }
    const brand = await prismadb.brand.delete({
      where: { id: params.brandId },
    });
    return NextResponse.json(brand);
  } catch (error) {
    console.log("BRAND_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
