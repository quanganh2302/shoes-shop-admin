import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, password, phoneNumber, role } = body;

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }
    if (!password) {
      return new NextResponse("Password is required", { status: 400 });
    }
    if (!phoneNumber) {
      return new NextResponse("Phone number is required", { status: 400 });
    }
    if (!role) {
      return new NextResponse("Role is required", { status: 400 });
    }

    const user = await prismadb.user.create({
      data: {
        email,
        password,
        phoneNumber,
        role,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const users = await prismadb.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
