import type { LookupSchema } from "@org/zod";
import { api } from "../../api.js";

export const lookupApi = {
  getRoles: async () => {
    return await api.getMany<LookupSchema>({ path: `/lookup/roles` });
  },
};
