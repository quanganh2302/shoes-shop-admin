import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { value, variationId } = body;

    if (!value) {
      return new NextResponse("Value is required", { status: 401 });
    }
    if (!variationId) {
      return new NextResponse("Variation id is required", { status: 401 });
    }
    const option = await prismadb.optionOfVariation.create({
      data: {
        value,
        variationId,
      },
    });
    return NextResponse.json(option);
  } catch (error) {
    console.log("[VARIATION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const options = await prismadb.optionOfVariation.findMany();
    return NextResponse.json(options);
  } catch (error) {
    console.log(error);
    console.log("[OPTION_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
