import { z } from "zod";

export const statusCountsSchema = z.object({
  totalEmployees: z.number().int().min(0),
  activeEmployes: z.number().int().min(0),
  inactiveEmployes: z.number().int().min(0),
  departments: z.number().int().min(0),
});
export type StatusCountsSchema = z.infer<typeof statusCountsSchema>;
