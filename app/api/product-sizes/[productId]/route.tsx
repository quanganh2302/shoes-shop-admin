import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { productId: string } }
) => {
  try {
    if (!params.productId) {
      return new NextResponse("Product Item Id is required", { status: 400 });
    }
    const productItems = await prismadb.productItem.findMany({
      where: {
        productId: params.productId,
      },
    });

    return NextResponse.json(productItems);
  } catch (error) {
    console.log(error);
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
