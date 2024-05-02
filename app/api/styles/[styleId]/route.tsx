import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { styleId: string } }
) => {
  try {
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return new NextResponse("style name is required", { status: 400 });
    }
    if (!params.styleId) {
      return new NextResponse("style id is required", { status: 400 });
    }
    const style = await prismadb.style.updateMany({
      where: {
        id: params.styleId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(style);
  } catch (error) {
    console.log("[STYLE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { styleId: string } }
) => {
  try {
    if (!params.styleId) {
      return new NextResponse("style id is required", { status: 400 });
    }
    const style = await prismadb.style.delete({
      where: { id: params.styleId },
    });
    return NextResponse.json(style);
  } catch (error) {
    console.log("STYLE_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
