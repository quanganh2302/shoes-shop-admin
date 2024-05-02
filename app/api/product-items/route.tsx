import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { productId, sizeValue, qty_in_stoke } = body;

    if (!productId) {
      return new NextResponse("product Id is required", { status: 400 });
    }
    if (!sizeValue) {
      return new NextResponse("Size Id is required", { status: 400 });
    }
    if (!qty_in_stoke) {
      return new NextResponse("Quantity is required", { status: 400 });
    }

    const productItem = await prismadb.productItem.create({
      data: {
        productId,
        sizeValue,
        qty_in_stoke,
      },
    });
    // Update quantity of Product Item

    const totalQuantity = await prismadb.productItem.aggregate({
      _sum: {
        qty_in_stoke: true,
      },
      where: {
        productId,
      },
    });

    await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        qty_in_stoke: totalQuantity._sum.qty_in_stoke || 0,
      },
    });
    return NextResponse.json(productItem);
  } catch (error) {
    console.log("[PRODUCT_ITEM_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const productItem = await prismadb.productItem.findMany();
    return NextResponse.json(productItem);
  } catch (error) {
    console.log(error);
    console.log("[PRODUCT_ITEM_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
