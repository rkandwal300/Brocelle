"use client";

import { revalidateTag } from "next/cache";
import { CollectionSchema } from "../validation/Collection";
import { z } from "zod";

export async function createCollection(
  values: z.infer<typeof CollectionSchema>
) {
  try {
    const res = await fetch("/api/collections", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      throw new Error("unable to create data");
    }
    return res.json();
  } catch (error) {
    throw error;
  }
}
export const GetAllCollections = async () => {
  try {
    const res = await fetch("/api/collections", {
      method: "GET",
      cache: "no-cache",
      next: { tags: ["getAllCollections"] },
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
) => {
  console.log("collectionId PATCH inside action", collectionId);
  try {
    const res = await fetch(`/api/collections/${collectionId}`, {
      method: "PATCH",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return await res.json();
  } catch (error) {
    console.error("[GetAllCollections]", error);
    throw error;
  } finally {
    revalidateTag("getAllCollections");
  }
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
    revalidateTag("getAllCollections");
  }
};
