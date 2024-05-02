import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { genderId: string } }
) => {
  try {
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return new NextResponse("gender name is required", { status: 401 });
    }
    const gender = await prismadb.gender.updateMany({
      where: {
        id: params.genderId,
      },
      data: {
        name: name.toLowerCase(),
      },
    });
    return NextResponse.json(gender);
  } catch (error) {
    console.log("[GENDER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { genderId: string } }
) => {
  try {
    if (!params.genderId) {
      return new NextResponse("gender id is required", { status: 401 });
    }
    const gender = await prismadb.gender.delete({
      where: { id: params.genderId },
    });
    return NextResponse.json(gender);
  } catch (error) {
    console.log("GENDER_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
