import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const {
      name,
      productId,
      SKU,
      qty_in_stoke,
      price,
      images,
      promotionId,
      isFeatured,
      isArchived,
    } = body;
    if (!name) {
      return new NextResponse("Product item name is required", { status: 401 });
    }
    if (!productId) {
      return new NextResponse("Product id is required", { status: 401 });
    }
    if (!SKU) {
      return new NextResponse("SKU is required", { status: 401 });
    }
    if (!qty_in_stoke) {
      return new NextResponse("Quantity is required", { status: 401 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 401 });
    }
    if (!images || !images.length) {
      return new NextResponse("imageURL is required", { status: 401 });
    }
    const productItem = await prismadb.productItem.create({
      data: {
        name,
        productId,
        promotionId,
        isFeatured,
        isArchived,
        SKU,
        qty_in_stoke,
        price,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(productItem);
  } catch (error) {
    console.log("PRODUCT_ITEM_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const productItems = await prismadb.productItem.findMany();
    return NextResponse.json(productItems);
  } catch (error) {
    console.log("PRODUCT_ITEM_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
