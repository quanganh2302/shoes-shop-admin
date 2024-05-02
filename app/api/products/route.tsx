import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const {
      name,
      SKU,
      price,
      images,
      colorId,
      brandId,
      styleId,
      promotionId,
      isFeatured,
      isArchived,
      avatarURL,
      categoryId,
      description,
    } = body;
    if (!name) {
      return new NextResponse("Product name is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }
    if (!brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }
    if (!styleId) {
      return new NextResponse("Style id is required", { status: 400 });
    }
    if (!SKU) {
      return new NextResponse("SKU is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("imageUrl is required", { status: 401 });
    }
    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 401 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!avatarURL) {
      return new NextResponse("AvatarURL is required", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("imageURL is required", { status: 400 });
    }
    const product = await prismadb.product.create({
      data: {
        name: name.toLowerCase(),
        promotionId,
        isFeatured,
        isArchived,
        colorId,
        brandId,
        styleId,
        SKU,
        avatarURL,
        price,
        categoryId,
        description,
        images,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("PRODUCT_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const products = await prismadb.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.log("PRODUCT_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
