import type { FilterOptions } from '@org/web-utils';

import { api } from '../../api.js';
import {
  CreateEmployeeInput,
  EmployeeResponseSchema,
  MembershipNode,
} from '@org/zod';

export const employeeApi = {
  createEmployee: async (input: CreateEmployeeInput) => {
    const data = await api.post({
      path: `/employee`,
      data: input,
    });
    return data;
  },
  getMyDetails: async () => {
    const data = await api.get<EmployeeResponseSchema>({
      path: `/employee/me`,
    });
    return data;
  },
  getEmployees: async (filterOptions: FilterOptions) => {
    const data = await api.getMany<EmployeeResponseSchema>({
      path: `/employee`,
      filterOptions,
    });
    return data;
  },
  getemployeeTree: async () => {
    const data = await api.getMany<MembershipNode>({
      path: `/employee/tree`,
    });
    return data;
  },
  updateRole: async ({
    roleId,
    userId,
  }: {
    roleId: string;
    userId: string;
  }) => {
    const data = await api.patch({
      path: `/employee/${roleId}/role/${userId}`,
    });
    return data;
  },
  updateManager: async ({
    mangerId,
    userId,
  }: {
    mangerId: string;
    userId: string;
  }) => {
    const data = await api.patch({
      path: `/employee/${mangerId}/manager/${userId}`,
    });
    return data;
  },
  deleteEmployee: async (id: string) => {
    const res = await api.delete({ path: `/employee/${id}` });
    return res;
  },
};
