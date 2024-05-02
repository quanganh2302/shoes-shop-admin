import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { categoryId: string } }
) => {
  try {
    const body = await req.json();
    const { name, genderName } = body;
    if (!name) {
      return new NextResponse("Category name is required", { status: 401 });
    }
    if (!genderName) {
      return new NextResponse("Gender name is required", { status: 401 });
    }
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 401 });
    }
    const category = await prismadb.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name: name.toLowerCase(),
        genderName: genderName.toLowerCase(),
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { categoryId: string } }
) => {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 401 });
    }
    const category = await prismadb.category.delete({
      where: { id: params.categoryId },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("DELETE_CATEGORY", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { categoryId: string } }
) => {
  try {
    const category = await prismadb.category.findUnique({
      where: { id: params.categoryId },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
