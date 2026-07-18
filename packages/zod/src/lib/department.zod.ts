import z from 'zod';
import { validDescription, validString } from './helper/zodHelper.js';

export const createDepartmentInput = {
  bodySchema: z
    .object({
      name: validString,
      description: validDescription.optional(),
    })
    .strict(),
};
export const departmentResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
export type CreateDepartmentInput = z.infer<typeof createDepartmentInput.bodySchema>
export type UpdateDepartmentInput = z.infer<typeof createDepartmentInput.bodySchema>
export type DepartmentResponse = z.infer<typeof departmentResponseSchema>
