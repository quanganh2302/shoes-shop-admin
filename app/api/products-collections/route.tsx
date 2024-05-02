import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { productId, collectionId } = body;

    if (!productId) {
      return new NextResponse("Product id is required", { status: 401 });
    }
    if (!collectionId) {
      return new NextResponse("Collection id is required", { status: 401 });
    }
    const res = await prismadb.productAndCollection.create({
      data: {
        productId,
        collectionId,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("[PRODUCT_COLLECTION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const res = await prismadb.productAndCollection.findMany();
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    console.log("[PRODUCT_COLLECTION_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
