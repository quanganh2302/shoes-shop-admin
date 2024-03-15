import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { optionId: string } }
) => {
  try {
    const body = await req.json();
    const { value, variationId } = body;
    if (!value) {
      return new NextResponse("Option value is required", { status: 401 });
    }
    if (!variationId) {
      return new NextResponse("variation Id is required", { status: 401 });
    }
    if (!params.optionId) {
      return new NextResponse("Option id is required", { status: 401 });
    }
    const option = await prismadb.optionOfVariation.updateMany({
      where: {
        id: params.optionId,
      },
      data: {
        value,
        variationId,
      },
    });
    return NextResponse.json(option);
  } catch (error) {
    console.log("[OPTION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { optionId: string } }
) => {
  try {
    if (!params.optionId) {
      return new NextResponse("Option id is required", { status: 401 });
    }
    const option = await prismadb.optionOfVariation.delete({
      where: { id: params.optionId },
    });
    return NextResponse.json(option);
  } catch (error) {
    console.log("OPTION_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
