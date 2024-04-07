import { connectDb } from "@/lib/mongoDb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/lib/models/Collection";
import { CollectionSchema } from "@/lib/validation/Collection";
import { z } from "zod";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { collectionId } = params;

    await connectDb();
    const collections = await Collection.findById(collectionId);
    if (!collections) {
      return new NextResponse("Collection not found", { status: 404 });
    }
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
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    await connectDb();
    if (!req.body) {
      return new NextResponse("Please fill all mandatory fields.", {
        status: 400,
      });
    }
    const updateData: z.infer<typeof CollectionSchema> = await req.json();

    const response = await Collection.findOneAndUpdate(
      { _id: collectionId },
      { $set: updateData },
      { new: true }
    );
    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("[collections_PATCH]", error);
    throw error;
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
