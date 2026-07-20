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

const departmentSchema = z.object({
  id: z.uuid(),
  name: z.string(),
});

const roleSchema = z.object({
  id: z.uuid(),
  name: z.string(),
});

const userSchema = z.object({
  email: z.email(),
  name: z.string(),
  avatar: z.string().nullable(),
  id: z.string().uuid(),
});

const employeeResponseSchema = z.object({
  id: z.uuid(),
  createdAt: z.date(),
  salary: z.number(),
  designation: z.string(),
  joiningDate: z.date(),
  department: departmentSchema,
  reportingManager: z.object({
    user: z.object({
      name: z.string(),
      id: z.string(),
    }),
  }),
  active: z.boolean(),
  role: roleSchema,
  user: userSchema,
});
export type EmployeeResponseSchema = z.infer<typeof employeeResponseSchema>;
export type CreateEmployeeInput = z.infer<
  typeof createEmployeeInput.bodySchema
>;
export type UpdateEmployeeInput = z.infer<
  typeof updateEmployeeInput.bodySchema
>;

export type MembershipNode = {
  id: string;
  managerId: string | null;
  designation: string | null;
  user: { name: string };
  role: { name: string };
  department: { name: string } | null;
  children: MembershipNode[];
};

export const employeeMembershipSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  userId: z.string().uuid(),
  managerId: z.string().uuid(),
  roleId: z.string().uuid(),
  departmentId: z.string().uuid(),
  createdAt: z.coerce.date(),
  designation: z.string(),
  salary: z.number().nonnegative(),
  joiningDate: z.coerce.date(),
  active: z.boolean(),
  isSystem: z.boolean(),
  department: departmentSchema,
  role: roleSchema,
});
export type EmployeeMembershipDetails = z.infer<typeof employeeMembershipSchema>;
