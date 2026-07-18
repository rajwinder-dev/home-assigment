import type { LookupSchema } from "@org/zod";
import { api } from "../../api.js";

export const lookupApi = {
  getRoles: async () => {
    return await api.getMany<LookupSchema>({ path: `/lookup/roles` });
  },
  getDepartments: async () => {
    return await api.getMany<LookupSchema>({ path: `/lookup/departments` });
  },
  getMangers: async () => {
    return await api.getMany<LookupSchema>({ path: `/lookup/mangers` });
  },
};
