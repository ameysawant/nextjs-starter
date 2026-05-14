import { z } from "zod";

export const authSchema = z.object({
  id: z.string()
});

export type AuthFormData = z.infer<typeof authSchema>;
