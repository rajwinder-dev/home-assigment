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

export type CreateDepartmentInput = z.infer<typeof createDepartmentInput.bodySchema>
export type UpdateDepartmentInput = z.infer<typeof createDepartmentInput.bodySchema>
