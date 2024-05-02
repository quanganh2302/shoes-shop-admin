import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    const gender = await prismadb.gender.create({
      data: {
        name: name.toLowerCase(),
      },
    });
    return NextResponse.json(gender);
  } catch (error) {
    console.log("[GENDER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const genders = await prismadb.gender.findMany();
    return NextResponse.json(genders);
  } catch (error) {
    console.log(error);
    console.log("[GENDER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
