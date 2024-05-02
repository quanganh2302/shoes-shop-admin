import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { key, value } = body;

    if (!value) {
      return new NextResponse("Value is required", { status: 401 });
    }
    if (!key) {
      return new NextResponse("Key is required", { status: 401 });
    }
    const role = await prismadb.role.create({
      data: {
        value,
        key,
      },
    });
    return NextResponse.json(role);
  } catch (error) {
    console.log("[ROLE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const roles = await prismadb.role.findMany();
    return NextResponse.json(roles);
  } catch (error) {
    console.log(error);
    console.log("[ROLE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
