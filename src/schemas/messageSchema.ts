import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(1, "Message content is required")
    .max(300, "Message content must be less than 300 characters"),
});
