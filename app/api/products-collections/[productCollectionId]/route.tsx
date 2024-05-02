import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { productCollectionId: string } }
) => {
  try {
    const body = await req.json();
    const { productId, collectionId } = body;

    if (!productId) {
      return new NextResponse("Product id is required", { status: 401 });
    }
    if (!collectionId) {
      return new NextResponse("Collection id is required", { status: 401 });
    }
    if (!params.productCollectionId) {
      return new NextResponse("productCollection id is required", {
        status: 400,
      });
    }
    const res = await prismadb.productAndCollection.updateMany({
      where: {
        id: params.productCollectionId,
      },
      data: {
        productId,
        collectionId,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("[PRODUCT_COLLECTION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { productCollectionId: string } }
) => {
  try {
    if (!params.productCollectionId) {
      return new NextResponse("productCollection id is required", {
        status: 401,
      });
    }
    const res = await prismadb.productAndCollection.delete({
      where: { id: params.productCollectionId },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("PRODUCT_COLLECTION_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
