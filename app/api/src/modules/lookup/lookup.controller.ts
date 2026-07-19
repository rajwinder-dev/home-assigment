import { lookupSchema } from '@org/zod';
import z from 'zod';
import { catchAsync } from '../../core/utils/catchAsync.js';
import response from '../../core/utils/response.js';
import { getTenantClient, prisma } from '@org/database';
import { ASSIGNABLE_ROLES } from '@org/constants';

export class LookupController {
  static getRoles = catchAsync(async (req, res, _next) => {
    const allowedroles = req.user?.role ? ASSIGNABLE_ROLES[req.user?.role] : [];
    const data = await prisma.role.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        organizationId: req.organization.id,
        name: {
          in: allowedroles,
        },
      },
    });
    const output = data.map((item) => ({ id: item.id, name: item.name }));
    response(res, output, 200, { schema: z.array(lookupSchema) });
  });
  static getDepartments = catchAsync(async (req, res, _next) => {
    const tenantdb = getTenantClient(req.organization.id);
    const data = await tenantdb.department.findMany({
      where: {
        organizationId: req.organization.id,
      },
      select: {
        id: true,
        name: true,
      },
    });
    const output = data.map((item) => ({ id: item.id, name: item.name }));
    response(res, output, 200, { schema: z.array(lookupSchema) });
  });
  static getMangers = catchAsync(async (req, res, _next) => {
    const data = await prisma.membership.findMany({
      where: {
        organizationId: req.organization.id,
        role: {
          name: 'manager',
        },
      },
      select: {
        id: true,
        userId: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    const output = data.map((item) => ({
      id: item.userId,
      name: item.user?.name,
    }));

    response(res, output, 200, { schema: z.array(lookupSchema) });
  });
}
