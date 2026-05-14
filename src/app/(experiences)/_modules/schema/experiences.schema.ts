import { z } from "zod";

export const experiencesSchema = z.object({
  id: z.string()
});

export type ExperiencesFormData = z.infer<typeof experiencesSchema>;
