import { z } from "zod";

// --- Main Inputs ---


export const emailProviderSchema = z.object({
  id: z.uuid(),
  providerType: z.enum(["RESEND", "SMTP"]),
  fromEmail: z.email(),
  domain: z.url(),
  priority: z.number(),
});

export const emailJobSchema = z.object({
  jobType: z.literal("email"),
  to: z.email(),
  subject: z.string().min(1),
  data: z.unknown(),
  template: z.enum(["invite", "forgetPassword", "welcome"]),
  organizationId: z.string().optional(),
  isSystemEmail: z.boolean(),
});

export type EmailQueueInput = z.infer<typeof emailJobSchema>;
export type EmailProviderSchema = z.infer<typeof emailProviderSchema>;
