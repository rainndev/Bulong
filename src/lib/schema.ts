import { z } from "zod";

export const PostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  userId: z.string().trim().min(1, "Title is strictly required"),
});
