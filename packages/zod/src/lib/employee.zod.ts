import { z } from 'zod';
import {
  optionalInput,
  validDescription,
  validEmail,
  validPhoneNo,
  validString,
} from './helper/zodHelper.js';

export const createEmployeeInput = {
  bodySchema: z
    .object({
      username: validString,
      email: validEmail,
      phoneNo: validPhoneNo,
      avatar: optionalInput(z.url('Invalid avatar URL')),
      gender: z.enum(['male', 'female', 'other'], {
        message: 'Please select a valid gender',
      }),
      location: optionalInput(validString),
      designation: z.string().optional(),
      salary: optionalInput(z.number().optional()),
      joiningDate: z.coerce.date().optional(),
      roleId: z.uuid('Invalid Role ID'),
      deptid: z.uuid('Invalid department ID'),
      managerId: z.uuid('Invalid manager ID').optional(),
      reportingManagerId: z.uuid('Invalid reporting manager ID').optional(),
    })
    .strict(),
};

export const updateEmployeeInput = {
  bodySchema: z
    .object({
      username: validString.optional(),
      email: validEmail.optional(),
      phoneNo: validPhoneNo.optional(), // Fixed naming: changed phoneNumber to phoneNo
      location: validString.optional(),
      avatar: z.string().url('Invalid avatar URL').optional(),
      jobTitle: validString.optional(),
      description: validDescription.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
    })
    .strict(),
};

export type CreateEmployeeInput = z.infer<
  typeof createEmployeeInput.bodySchema
>;
export type UpdateEmployeeInput = z.infer<
  typeof updateEmployeeInput.bodySchema
>;
