import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return new NextResponse("collection name is required", { status: 401 });
    }
    const collection = await prismadb.collection.updateMany({
      where: {
        id: params.collectionId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(collection);
  } catch (error) {
    console.log("[COLLECTION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { collectionId: string } }
) => {
  try {
    if (!params.collectionId) {
      return new NextResponse("Collection id is required", { status: 401 });
    }
    const collection = await prismadb.collection.delete({
      where: { id: params.collectionId },
    });
    return NextResponse.json(collection);
  } catch (error) {
    console.log("COLLECTION_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
