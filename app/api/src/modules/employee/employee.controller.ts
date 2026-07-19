import { Prisma, prisma } from '@org/database';
import { CreateEmployeeInput, memberSchemaResponse } from '@org/zod';
import z from 'zod';
import { APIFeatures } from '../../core/utils/apiFeatures.js';
import { catchAsync } from '../../core/utils/catchAsync.js';
import response from '../../core/utils/response.js';
import { EmployeeService } from './employee.service.js';
import { RoleService } from '../role/role.service.js';
import { appError } from '../../core/utils/appError.js';

export class EmployeeController {
  static createEmployee = catchAsync(async (req, res) => {
    const input = req.body as CreateEmployeeInput;
    const data = await EmployeeService.creteEmployee({
      input,
      organizationId: req.organization.id,
      createdBy: req.user.id,
      userRole: req.user.role,
    });
    response(res, data, 201);
  });
  static getAllEmployees = catchAsync(async (req, res) => {
    const { filterOptions, limit, offset } = new APIFeatures(req.query)
      .filter()
      .pagination()
      .sort()
      .search();
    const sorttype =
      filterOptions.orderBy && Object.keys(filterOptions.orderBy)[0];
    const sortOrder = sorttype
      ? (filterOptions.orderBy as Record<string, 'asc' | 'desc'>)[sorttype]
      : undefined;

    const orderBy: Prisma.MembershipOrderByWithRelationInput | undefined =
      sorttype === 'joiningDate'
        ? { joiningDate: sortOrder }
        : sorttype === 'name'
          ? { user: { name: sortOrder } }
          : undefined;
    const membership = await prisma.membership.findMany({
      where: {
        organizationId: req.organization.id,
        isSystem: false,
        ...filterOptions.where,
      },
      orderBy,
      select: {
        id: true,
        createdAt: true,
        salary: true,
        designation: true,
        joiningDate: true,
        reportingManager: {
          select: {
            user: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
        active: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
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

    const total = await prisma.membership.count({
      where: {
        organizationId: req.organization.id,
        ...filterOptions.where,
      },
    });
    console.log(membership);
    response(res, membership, 200, {
      otherFields: { limit, offset, total },
      schema: z.array(memberSchemaResponse),
    });
  });
  static updateRole = catchAsync(async (req, res) => {
    const { userId, roleId } = req.params as { userId: string; roleId: string };
    const canAssign = await RoleService.canAssignRole(req.user.role, roleId);
    if (!canAssign) throw new appError('You can not assign this role', 403);
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
  static updateManager = catchAsync(async (req, res) => {
    const { mangerMembershipId, userId } = req.params as {
      mangerMembershipId: string;
      userId: string;
    };

    if (mangerMembershipId === userId)
      throw new appError('You can not assign yourself as manager', 403);
    const data = await prisma.membership.update({
      where: {
        organizationId_userId: { organizationId: req.organization.id, userId },
      },
      data: { managerId: mangerMembershipId },
    });
    response(res, data);
  });
  static deleteEmployee = catchAsync(async (req, res) => {
    const id = req.params.id as string;
    const data = await prisma.membership.update({
      where: {
        organizationId_userId: {
          organizationId: req.organization.id,
          userId: id,
        },
      },
      data: {
        active: false,
      },
    });
    response(res, data);
  });
  static getorgTree = catchAsync(async (req, res) => {
    const data = await EmployeeService.getOrgTree(req.organization.id);
    response(res, data);
  });
}
