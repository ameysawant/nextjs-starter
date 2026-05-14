import { z } from "zod";

export const flightsSchema = z.object({
  id: z.string()
});

export type FlightsFormData = z.infer<typeof flightsSchema>;
