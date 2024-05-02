import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const categoryName = url.searchParams.get("categoryName");
  if (!categoryName) {
    return new NextResponse("Category Name is required");
  }
  try {
    const category = await prismadb.category.findUnique({
      where: {
        name: categoryName,
      },
    });
    const products = await prismadb.product.findMany({
      where: {
        categoryId: category?.id,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
