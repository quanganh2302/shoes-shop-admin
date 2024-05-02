import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { roleId: string } }
) => {
  try {
    const body = await req.json();
    const { value, key } = body;
    if (!value) {
      return new NextResponse("Role value is required", { status: 401 });
    }
    if (!key) {
      return new NextResponse("Role key is required", { status: 401 });
    }
    if (!params.roleId) {
      return new NextResponse("size id is required", { status: 401 });
    }
    const role = await prismadb.role.updateMany({
      where: {
        id: params.roleId,
      },
      data: {
        value,
        key
      },
    });
    return NextResponse.json(role);
  } catch (error) {
    console.log("[ROLE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { roleId: string } }
) => {
  try {
    if (!params.roleId) {
      return new NextResponse("Role id is required", { status: 401 });
    }
    const role = await prismadb.role.delete({
      where: { id: params.roleId },
    });
    return NextResponse.json(role);
  } catch (error) {
    console.log("ROLE_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
