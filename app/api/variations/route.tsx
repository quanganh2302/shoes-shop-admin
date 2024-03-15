import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, categoryId } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }
    const variation = await prismadb.variation.create({
      data: {
        name,
        categoryId,
      },
    });
    return NextResponse.json(variation);
  } catch (error) {
    console.log("[VARIATION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const variations = await prismadb.variation.findMany();
    return NextResponse.json(variations);
  } catch (error) {
    console.log(error);
    console.log("[VARIATION_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
