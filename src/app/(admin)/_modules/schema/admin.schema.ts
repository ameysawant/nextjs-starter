import { z } from "zod";

export const adminSchema = z.object({
  id: z.string()
});

export type AdminFormData = z.infer<typeof adminSchema>;
