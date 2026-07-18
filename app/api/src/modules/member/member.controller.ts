import {
  ChangeMemberRoleInput,
  memberSchemaResponse,
} from '@org/zod';
import z from 'zod';
import { APIFeatures } from '../../core/utils/apiFeatures.js';
import { catchAsync } from '../../core/utils/catchAsync.js';
import response from '../../core/utils/response.js';
import { prisma } from '@org/database';

export class MemberController {
  static getMembers = catchAsync(async (req, res, _next) => {
    const { filterOptions, limit, offset } = new APIFeatures(req.query, {
      ignore: ['queueId'],
    })
      .filter()
      .pagination();
    const membership = await prisma.membership.findMany({
      where: {
        organizationId: req.organization.id,
        isSystem: false,
        ...filterOptions.where,
      },
      select: {
        organizationId: true,
        id: true,
        createdAt: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            email: true,
            name: true,
            avatar: true,
            id: true,
          },
        },
      },
      skip: offset,
      take: limit,
    });

    const data = membership.map((item) => {
      const user = item.user;

      return {
        id: item.id,
        userId: item.user?.id,
        email: user?.email,
        name: user?.name,
        avatar: user?.avatar,
        role: item.role?.name,
        roleId: item.role?.id,
        createdAt: item.createdAt,
        organizationId: item.organizationId,
      };
    });
    const total = await prisma.membership.count({
      where: {
        organizationId: req.organization.id,
        ...filterOptions.where,
      },
    });
    response(res, data, 200, {
      otherFields: { limit, offset, total },
      schema: z.array(memberSchemaResponse),
    });
  });
  static updateRole = catchAsync(async (req, res, _next) => {
    const { userId, roleId } = req.params as ChangeMemberRoleInput;
    const data = await prisma.membership.update({
      where: {
        organizationId_userId: {
          organizationId: req.organization.id,
          userId,
        },
      },
      data: {
        roleId,
      },
    });
    response(res, data);
  });
}
