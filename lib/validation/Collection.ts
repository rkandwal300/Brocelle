import { z } from "zod";

export const CollectionSchema = z.object({
  title: z.string().min(3).max(105),
  description: z.string().min(3).max(500),
  image: z.string(),
});
