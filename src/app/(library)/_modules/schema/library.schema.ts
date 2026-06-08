import { z } from "zod";

export const librarySchema = z.object({
  id: z.string()
});

export type LibraryFormData = z.infer<typeof librarySchema>;
