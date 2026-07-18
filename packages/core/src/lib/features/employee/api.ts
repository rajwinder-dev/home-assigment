import type { FilterOptions } from '@org/web-utils';

import { api } from '../../api.js';
import { CreateEmployeeInput } from '@org/zod';

export const employeeApi = {
  createEmployee: async (input: CreateEmployeeInput) => {
    const data = await api.post({
      path: `/employee`,
      data: input,
    });
    return data;
  },
  getEmployees: async (filterOptions: FilterOptions) => {
    const data = await api.getMany({
      path: `/employee`,
      filterOptions,
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
    const data = await api.post({
      path: `/employee/${roleId}/roles/${userId}`,
    });
    return data;
  },
};
