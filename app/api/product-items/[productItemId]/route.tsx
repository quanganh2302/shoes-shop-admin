import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { productItemId: string } }
) => {
  try {
    const body = await req.json();
    const { productId, sizeValue, qty_in_stoke } = body;

    if (!productId) {
      return new NextResponse("Product Item Id is required", { status: 400 });
    }
    if (!sizeValue) {
      return new NextResponse("Size value is required", { status: 400 });
    }
    if (!qty_in_stoke) {
      return new NextResponse("Quantity is required", { status: 400 });
    }
    const productItem = await prismadb.productItem.updateMany({
      where: {
        id: params.productItemId,
      },
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
    console.log("[PRODUCT_ITEM_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { productItemId: string } }
) => {
  try {
    if (!params.productItemId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const productItemBefore = await prismadb.productItem.findUnique({
      where: {
        id: params.productItemId,
      },
    });

    const productItem = await prismadb.productItem.delete({
      where: { id: params.productItemId },
    });

    const productItemAfter = await prismadb.productItem.findMany({
      where: {
        productId: productItemBefore?.productId,
      },
    });

    if (productItemAfter) {
      const totalQuantity = await prismadb.productItem.aggregate({
        _sum: {
          qty_in_stoke: true,
        },
        where: {
          productId: productItemBefore?.productId,
        },
      });

      await prismadb.product.update({
        where: {
          id: productItemBefore?.productId,
        },
        data: {
          qty_in_stoke: totalQuantity._sum.qty_in_stoke || 0,
        },
      });
    } else {
      await prismadb.product.update({
        where: {
          id: productItemBefore?.productId,
        },
        data: {
          qty_in_stoke: 0,
        },
      });
    }

    return NextResponse.json(productItem);
  } catch (error) {
    console.log("PRODUCT_ITEM_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
