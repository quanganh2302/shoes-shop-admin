import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  try {
    if (!params.email) {
      return new NextResponse("Email is required", { status: 401 });
    }

    const user = await prismadb.user.findMany({
      where: {
        email: params.email,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export const PATCH = async (
  req: Request,
  { params }: { params: { email: string } }
) => {
  try {
    const body = await req.json();
    const { phoneNumber, password, userName, roleKey } = body;
    if (!phoneNumber) {
      return new NextResponse("Phone Number is required", { status: 401 });
    }
    if (!roleKey) {
      return new NextResponse("Role Id is required", { status: 401 });
    }
    if (!params.email) {
      return new NextResponse("Email is required", { status: 401 });
    }
    const updateUser = await prismadb.user.updateMany({
      where: {
        email: params.email,
      },
      data: {
        password,
        phoneNumber,
        userName,
        roleKey,
      },
    });
    return NextResponse.json(updateUser);
  } catch (error) {
    console.log("[USER_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { email: string } }
) {
  try {
    if (!params.email) {
      return new NextResponse("Email is required", { status: 400 });
    }
    // const userByEmail = await prismadb.user.findFirst({
    //   where: {
    //     email: params.email,
    //   },
    // });

    // if (!userByEmail) {
    //   return new NextResponse("Unauthorized", { status: 403 });
    // }
    // const user = await prismadb.user.deleteMany({
    //   where: {
    //     email: params.email,
    //   },
    // });

    const user = await prismadb.user.delete({
      where  :{ 
        email : params.email
      }
    })
    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
