import 'dotenv/config';
import { emailQueuePush } from '../../core/utils/emailQueue.js';
export class EmailService {
  static queueEmail = async ({
    organizationId,
    to,
    subject,
    template,
    data,
    isSystemEmail,
  }: {
    organizationId: string;
    to: string;
    subject: string;
    template: string;
    data: any;
    isSystemEmail: true;
  }) => {
    // send email to queue  . replace with resend provider
    return await emailQueuePush({
      organizationId,
      to,
      subject,
      template,
      data,
      jobType: 'email',
      isSystemEmail,
    });
  };
}
