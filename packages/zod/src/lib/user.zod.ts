import { z } from "zod";
import {
  optionalInput,
  validBigDescription,
  validPhoneNo,
  validString,
  validUrl,
} from "./helper/zodHelper.js";

export const onboardUserInput = {
  bodySchema: z
    .object({
      user: z.object({
        location: validString.optional(),
      }),
      organization: z.object({
        name: validString,
        description: validBigDescription.optional(),
        teamSize: z.number().int().nonnegative("Team size cannot be negative"),
      }),
    })
    .strict(),
};

export const updateMyDetailsInput = {
  bodySchema: z
    .object({
      phoneNo: optionalInput(validPhoneNo),
      avatar: optionalInput(validUrl),
      location: optionalInput(validString),
    })
    .strict(),
};

export const userSchemaResponse = z.object({
  location: z.string().nullable(),
  phoneNo: z.string().nullable(),
  avatar: z.string().nullable(),
  id: z.string(),
  code: z.string(),
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.email(),
  username: z.string().nullable(),
});

// --- Inferred Types ---
export type UserSchema = z.infer<typeof userSchemaResponse>;
export type UpdateMyDetailsInput = z.infer<typeof updateMyDetailsInput.bodySchema>;
export type OnBoardUserInput = z.infer<typeof onboardUserInput.bodySchema>;
