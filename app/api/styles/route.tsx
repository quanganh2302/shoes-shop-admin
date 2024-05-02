import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const style = await prismadb.style.create({
      data: {
        name,
      },
    });
    return NextResponse.json(style);
  } catch (error) {
    console.log("[STYLE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const styles = await prismadb.style.findMany();
    return NextResponse.json(styles);
  } catch (error) {
    console.log(error);
    console.log("[STYLE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
