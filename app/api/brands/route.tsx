import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const brand = await prismadb.brand.create({
      data: {
        name,
      },
    });
    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRAND_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const brands = await prismadb.brand.findMany();
    return NextResponse.json(brands);
  } catch (error) {
    console.log(error);
    console.log("[BRAND_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
