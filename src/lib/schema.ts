import { z } from "zod";

export const PostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  userId: z.string().trim().min(1, "Invalid User"),
  browser: z.string(),
  country: z.string(),
  device: z.string(),
  OS: z.string(),
  region: z.string(),
});

// Pick only the fields you need for the client
export const PostFormSchema = PostSchema.pick({
  userId: true,
  title: true,
  content: true,
});

// Optional TypeScript type
export type PostFormField = z.infer<typeof PostFormSchema>;
