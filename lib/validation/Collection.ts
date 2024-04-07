import { z } from "zod";

export const CollectionSchema = z.object({
  _id: z.string().optional(),
  title: z
    .string()
    .nonempty({ message: "tiitle ois required." })
    .min(3)
    .max(105),
  description: z.string().min(3).max(500),
  image: z.string().nonempty({ message: "Image is required." }),
  products: z.array(z.string()).optional(),
});
