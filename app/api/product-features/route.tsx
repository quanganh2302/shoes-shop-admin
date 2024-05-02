import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const products = await prismadb.product.findMany({
      where: {
        isFeatured: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
