import { z } from "zod";

export const homeSchema = z.object({
  id: z.string()
});

export type HomeFormData = z.infer<typeof homeSchema>;
