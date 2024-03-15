import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, imageURL, categoryId, description } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 401 });
    }
    if (!imageURL) {
      return new NextResponse("imageUrl is required", { status: 401 });
    }
    if (!description) {
      return new NextResponse("imageUrl is required", { status: 401 });
    }
    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 401 });
    }
    const product = await prismadb.product.create({
      data: {
        name,
        imageURL,
        categoryId,
        description,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const products = await prismadb.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
