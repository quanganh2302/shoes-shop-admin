import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { value } = body;

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    const size = await prismadb.size.create({
      data: {
        value,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const sizes = await prismadb.size.findMany();
    return NextResponse.json(sizes);
  } catch (error) {
    console.log(error);
    console.log("[SIZE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
