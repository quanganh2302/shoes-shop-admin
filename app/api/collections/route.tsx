import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    const collection = await prismadb.collection.create({
      data: {
        name,
      },
    });
    return NextResponse.json(collection);
  } catch (error) {
    console.log("[COLLECTION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const collections = await prismadb.collection.findMany();
    return NextResponse.json(collections);
  } catch (error) {
    console.log(error);
    console.log("[COLLECTION_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
