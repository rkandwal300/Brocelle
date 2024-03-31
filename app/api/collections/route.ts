import { connectDb } from "@/lib/mongoDb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/lib/models/Collection";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    await connectDb();
    const { title, description, image } = await req.json();

    const exisitingCollection = await Collection.findOne({ title });

    if (exisitingCollection) {
      return new NextResponse("Collection already exists", { status: 400 });
    }
    if (!title || !description || !image) {
      return new NextResponse("All fields are required", { status: 400 });
    }
    const newCollection = await Collection.create({
      title,
      description,
      image,
    });
    await newCollection.save();
    return NextResponse.json(newCollection, {
      status: 200,
    });
  } catch (error) {
    console.error("[collections_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  return new NextResponse(
    " you really want all connections by this get method ",
    {
      status: 200,
    }
  );
  // try {
  //   await connectDb();
  //   const collections = await Collection.find();
  //   return NextResponse.json(collections, { status: 200 });
  // } catch (error) {
  //   console.error("[collections_GET]", error);
  //   return new NextResponse("Internal Server Error", { status: 500 });
  // }
};
