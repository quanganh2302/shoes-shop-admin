import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { sizeId: string } }
) => {
  try {
    const body = await req.json();
    const { value } = body;
    if (!value) {
      return new NextResponse("Size value is required", { status: 400 });
    }
    if (!params.sizeId) {
      return new NextResponse("size id is required", { status: 400 });
    }
    const size = await prismadb.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        value,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { sizeId: string } }
) => {
  try {
    if (!params.sizeId) {
      return new NextResponse("size id is required", { status: 401 });
    }
    const size = await prismadb.size.delete({
      where: { id: params.sizeId },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("SIZE_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
