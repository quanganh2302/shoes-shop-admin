import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { productId: string } }
) => {
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
      avatarURL,
      isFeatured,
      isArchived,
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
    if (!avatarURL) {
      return new NextResponse("AvatarURL is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("imageURL is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }
    if (!params.productId) {
      return new NextResponse("Category id is required", { status: 400 });
    }
    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name: name.toLowerCase(),
        promotionId,
        isFeatured,
        isArchived,
        SKU,
        colorId,
        brandId,
        styleId,
        avatarURL,
        price,
        categoryId,
        description,
        images,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("PRODUCT_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { productId: string } }
) => {
  try {
    if (!params.productId) {
      return new NextResponse("Product Item id is required", { status: 400 });
    }
    const product = await prismadb.product.delete({
      where: { id: params.productId },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("PRODUCT_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { productId: string } }
) => {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 401 });
    }
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
