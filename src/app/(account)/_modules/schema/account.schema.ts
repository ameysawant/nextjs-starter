import { z } from "zod";

export const accountSchema = z.object({
  id: z.string()
});

export type AccountFormData = z.infer<typeof accountSchema>;
