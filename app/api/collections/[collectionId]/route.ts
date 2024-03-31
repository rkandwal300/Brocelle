import { connectDb } from "@/lib/mongoDb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/lib/models/Collection";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { collectionId } = params;
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    await connectDb();
    const collections = await Collection.findById(collectionId);
    return NextResponse.json(collections, {
      status: 200,
    });
  } catch (error) {
    console.error("[collections_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { collectionId } = params;
    console.log("collectionId PATCH inside route ", collectionId);
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    await connectDb();

    const { title, description, image } = await req.json();

    if (!title || !description || !image) {
      return new NextResponse("All fields are required", { status: 400 });
    }
    const updateCollection = await Collection.findByIdAndUpdate(collectionId, {
      title,
      description,
      image,
    });
    await updateCollection.save();

    return NextResponse.json(updateCollection, {
      status: 200,
    });
  } catch (error) {
    console.error("[collections_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { collectionId } = params;
    console.log("collectionId DELETE", collectionId);
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    await connectDb();
    const response = await Collection.findByIdAndDelete(collectionId);
    return new NextResponse("Collection deleted successfully", { status: 200 });
  } catch (error) {
    console.log("[collections_DELETE]", error);
    throw error;
  }
};
