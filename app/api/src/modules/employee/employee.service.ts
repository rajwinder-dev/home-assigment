import { CreateEmployeeInput, MembershipNode } from '@org/zod';
import { auth } from '../../lib/auth.js';
import { prisma } from '@org/database';
import { RoleService } from '../role/role.service.js';
import { appError } from '../../core/utils/appError.js';
export class EmployeeService {
  static async creteEmployee({
    input,
    organizationId,
    createdBy,
    userRole,
  }: {
    input: CreateEmployeeInput;
    organizationId: string;
    createdBy: string;
    userRole?: string;
  }) {
    const canAssign = await RoleService.canAssignRole(userRole, input.roleId);
    if (!canAssign) throw new appError('You can not assign this role', 403);

    let managerId;
    if (!input.managerId) {
      const data = await prisma.membership.findUnique({
        where: { organizationId_userId: { userId: createdBy, organizationId } },
      });
      managerId = data?.id;
    }else {
      managerId = input.managerId
    }
    let employeeId: string;

    const existAccount = await prisma.user.findUnique({
      where: { email: input.email },
      select: {
        id: true,
      },
    });

    if (existAccount) {
      employeeId = existAccount.id;
    } else {
      const data = await auth.api.signUpEmail({
        body: {
          name: input.username,
          email: input.email,
          password: input.email,
        },
      });
      employeeId = data.user.id;
    }
    //TODO: implemente trnasiction

    // join organization
    const data = await prisma.$transaction(async (tx) => {
      const membership = await tx.membership.create({
        data: {
          userId: employeeId,
          roleId: input.roleId,
          departmentId: input.deptid,
          managerId: managerId,
          organizationId,
          salary: input.salary,
          designation: input.designation,
          joiningDate: input.joiningDate,
        },
      });
      // update other information in database
      //
      const userData = await tx.user.update({
        where: { id: employeeId },
        data: {
          gender: input.gender,
          location: input.location,
          avatar: input.avatar,
        },
      });
      return { membership, userData };
    });

    return data;
  }
  static getOrgTree = async (organizationId: string) => {
    const memberships = await prisma.membership.findMany({
      where: { organizationId },
      select: {
        id: true,
        managerId: true,
        user: { select: { name: true } },
        role: { select: { name: true } },
        department: { select: { name: true } },
        designation: true,
      },
    });

    const byId = new Map<string, MembershipNode>(
      memberships.map((m) => [m.id, { ...m, children: [] }]),
    );

    const roots: MembershipNode[] = [];

    for (const m of byId.values()) {
      if (m.managerId) {
        const manager = byId.get(m.managerId);
        if (manager) {
          manager.children.push(m);
        } else {
          roots.push(m); // manager not in this org's dataset — treat as root
        }
      } else {
        roots.push(m);
      }
    }

    return roots;
  };
}
