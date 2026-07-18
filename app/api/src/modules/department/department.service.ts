import { getTenantClient, prisma } from '@org/database';
import { CreateDepartmentInput } from '@org/zod';
import { readableId } from '../../core/utils/utils';

export class DepartmentService {
  static create = async ({
    input,
    organizationId,
    userId,
  }: {
    input: CreateDepartmentInput;
    organizationId: string;
    userId: string;
  }) => {
    const data = await prisma.department.create({
      data: {
        ...input,
        organizationId,
        code: readableId('DEP'),
        createdBy: userId,
      },
    });
    return data;
  };
  static update = async ({
    id,
    input,
    organizationId,
  }: {
    id: string;
    input: CreateDepartmentInput;
    organizationId: string;
  }) => {
    const tenantDb = getTenantClient(organizationId);
    const data = await tenantDb.department.update({
      where: {
        id,
      },
      data: {
        ...input,
      },
    });
    return data;
  };
  static getall = async ({ organizationId }: { organizationId: string }) => {
    const tenantDb = getTenantClient(organizationId);
    const data = await tenantDb.department.findMany({
      where: {
        active: true,
      },
    });
    return data;
  };
  static delete = async ({
    id,
    organizationId,
  }: {
    id: string;
    organizationId: string;
  }) => {
    const tenantDb = getTenantClient(organizationId);
    const data = await tenantDb.department.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
    return data;
  };
}
