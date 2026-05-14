import { z } from "zod";

export const shopSchema = z.object({
  id: z.string()
});

export type ShopFormData = z.infer<typeof shopSchema>;
