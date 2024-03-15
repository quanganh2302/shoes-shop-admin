import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { configurationId: string } }
) => {
  try {
    const body = await req.json();
    const { productItemId, optionId } = body;

    if (!productItemId) {
      return new NextResponse("product Item Id is required", { status: 400 });
    }
    if (!optionId) {
      return new NextResponse("option Id is required", { status: 400 });
    }
    const configuration = await prismadb.productConfiguration.updateMany({
      where: {
        id: params.configurationId,
      },
      data: {
        productItemId,
        optionId,
      },
    });
    return NextResponse.json(configuration);
  } catch (error) {
    console.log("[CONFIGURATION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { configurationId: string } }
) => {
  try {
    if (!params.configurationId) {
      return new NextResponse("Configuration id is required", { status: 401 });
    }
    const configuration = await prismadb.productConfiguration.delete({
      where: { id: params.configurationId },
    });
    return NextResponse.json(configuration);
  } catch (error) {
    console.log("CONFIGURATION_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
