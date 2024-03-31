import CollectionForm from "@/components/collections/CollectionForm";
import { CollectionSchema } from "@/lib/validation/Collection";
import React from "react";
import { z } from "zod";

export default function CreateCollection() {
  return <CollectionForm />;
}
