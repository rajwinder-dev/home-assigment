import { statusCountsSchema } from '@org/zod';
import { catchAsync } from '../../core/utils/catchAsync.js';
import response from '../../core/utils/response.js';
import { prisma } from '@org/database';

export class dashboardController {
  static getSummary = catchAsync(async (req, res, _next) => {
    const [totalEmployees, activeEmployes, inactiveEmployes, departments] =
      await Promise.all([
        await prisma.membership.count({
          where: { organizationId: req.organization.id },
        }),
        await prisma.membership.count({
          where: { organizationId: req.organization.id, active: true },
        }),
        await prisma.membership.count({
          where: { organizationId: req.organization.id, active: false },
        }),
        await prisma.department.count({
          where: { organizationId: req.organization.id },
        }),
      ]);
    const data = {
      totalEmployees,
      activeEmployes,
      inactiveEmployes,
      departments,
    };
    response(res, data, 200, { schema: statusCountsSchema });
  });
}
