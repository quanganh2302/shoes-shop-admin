import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return new NextResponse("Category name is required", { status: 401 });
    }
    const category = await prismadb.category.create({
      data: {
        name,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const categories = await prismadb.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
