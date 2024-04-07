"use client";

import { revalidateTag } from "next/cache";
import { CollectionSchema } from "../validation/Collection";
import { z } from "zod";
import { FetchApiAction } from "./fetchApi";

export async function createCollection(
  values: z.infer<typeof CollectionSchema>
) {
  try {
    const res = await fetch("/api/collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      throw new Error("unable to create data");
    }
    return res.json();
  } catch (error) {
    throw error;
  } finally {
    revalidateTag("GetAllCollections");
  }
}
export const GetAllCollections = async () => {
  try {
    const res = await fetch("/api/collections", {
      method: "GET",
      cache: "no-cache",
      next: { tags: ["GetAllCollections"] },
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch collections");
    }
    return await res.json();
  } catch (error) {
    console.error("[GetAllCollections]", error);
    throw error;
  }
};
export const getCollection = async (collectionId: string) => {
  try {
    const res = await fetch(`/api/collections/${collectionId}`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return await res.json();
  } catch (error) {
    console.error("[GetAllCollections]", error);
    throw error;
  }
};

export const updateCollection = async (
  collectionId: string,
  body: z.infer<typeof CollectionSchema>
): Promise<z.infer<typeof CollectionSchema>> => {
  const url = `/api/collections/${collectionId}`;
  const message = "Failed to update collection";
  const options = {
    method: "PATCH",
    cache: "no-cache" as RequestCache,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  return FetchApiAction<z.infer<typeof CollectionSchema>>(
    url,
    message,
    options
  );
  // .finally(() => {
  //   revalidateTag("GetAllCollections");
  // });
};

export const DeleteCollection = async (collectionId: string) => {
  try {
    const res = await fetch(`/api/collections/${collectionId}`, {
      method: "DELETE",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return await res.json();
  } catch (error) {
    throw error;
  } finally {
    revalidateTag("GetAllCollections");
  }
};
