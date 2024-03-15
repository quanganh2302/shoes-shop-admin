import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { productId: string } }
) => {
  try {
    const body = await req.json();
    const { name, categoryId, description } = body;
    if (!name) {
      return new NextResponse("Product name is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }
    const product = await prismadb.product.updateMany({
      where: {
        id: params.productId,
      },
      data: {
        name,
        categoryId,
        description,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { productId: string } }
) => {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }
    const product = await prismadb.product.delete({
      where: { id: params.productId },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("DELETE_PRODUCT", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
