import {
  CreateDepartmentInput,
  DepartmentResponse,
  UpdateDepartmentInput,
} from '@org/zod';
import { api } from '../../api.js';

export const departmentApi = {
  getAlldepartments: async () => {
    const res = await api.get<DepartmentResponse[]>({ path: '/department' });
    return res;
  },
  getDetails: async (id: string) => {
    const res = await api.get<DepartmentResponse>({ path: `/role/${id}` });
    return res;
  },
  create: async (data: CreateDepartmentInput) => {
    const res = await api.post({ path: '/department', data });
    return res;
  },

  update: async (id: string, data: UpdateDepartmentInput) => {
    const res = await api.patch({ path: `/department/${id}`, data });
    return res;
  },
  delete: async (id: string) => {
    const res = await api.delete({ path: `/department/${id}` });
    return res;
  },
};
