import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
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
    const promotion = await prismadb.promotion.create({
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
    console.log("[PROMOTION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const promotions = await prismadb.promotion.findMany();
    return NextResponse.json(promotions);
  } catch (error) {
    console.log(error);
    console.log("[PROMOTION_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
