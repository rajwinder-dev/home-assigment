import {  type StatusCountsSchema } from '@org/zod';
import { api } from '../../api.js';

export const dashboardApi = {
  getSummary: async () => {
    const data = await api.get<StatusCountsSchema>({
      path: '/dashboard/summary',
    });
    return data;
  },
};
