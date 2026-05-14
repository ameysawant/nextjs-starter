import { z } from "zod";

export const hotelsSchema = z.object({
  id: z.string()
});

export type HotelsFormData = z.infer<typeof hotelsSchema>;
