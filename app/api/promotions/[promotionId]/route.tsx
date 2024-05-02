import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { promotionId: string } }
) => {
  try {
    const body = await req.json();
    const { name, description, discountRate, date } = body;
    if (!name) {
      return new NextResponse("Name is required", { status: 401 });
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 401 });
    }
    if (!discountRate) {
      return new NextResponse("Discount Rate is required", { status: 401 });
    }
    if (!date?.from) {
      return new NextResponse("Start Date is required", { status: 401 });
    }
    if (!date?.to) {
      return new NextResponse("End Date is required", { status: 401 });
    }
    if (!params.promotionId) {
      return new NextResponse("Promotion id is required", { status: 400 });
    }
    const promotion = await prismadb.promotion.updateMany({
      where: {
        id: params.promotionId,
      },
      data: {
        name,
        description,
        discountRate,
        startDate: date.from,
        endDate: date.to,
      },
    });
    return NextResponse.json(promotion);
  } catch (error) {
    console.log("[PROMOTION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { promotionId: string } }
) => {
  try {
    if (!params.promotionId) {
      return new NextResponse("Promotion id is required", { status: 401 });
    }
    const promotion = await prismadb.promotion.delete({
      where: { id: params.promotionId },
    });
    return NextResponse.json(promotion);
  } catch (error) {
    console.log("DELETE_PROMOTION", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { promotionId: string } }
) => {
  try {
    if (!params.promotionId) {
      return new NextResponse("Promotion id is required", { status: 401 });
    }
    const promotion = await prismadb.promotion.findUnique({
      where: {
        id: params.promotionId,
      },
    });
    return NextResponse.json(promotion);
  } catch (error) {
    console.log(error);
    console.log("[PROMOTION_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
