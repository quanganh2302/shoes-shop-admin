import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { productItemId, optionId } = body;

    if (!productItemId) {
      return new NextResponse("product Item Id is required", { status: 400 });
    }
    if (!optionId) {
      return new NextResponse("option Id is required", { status: 400 });
    }
    const configuration = await prismadb.productConfiguration.create({
      data: {
        productItemId,
        optionId,
      },
    });
    return NextResponse.json(configuration);
  } catch (error) {
    console.log("[CONFIGURATION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const configuration = await prismadb.productConfiguration.findMany();
    return NextResponse.json(configuration);
  } catch (error) {
    console.log(error);
    console.log("[CONFIGURATION_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
