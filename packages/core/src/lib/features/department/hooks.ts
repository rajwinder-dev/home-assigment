import type { CreateDepartmentInput, UpdateDepartmentInput } from '@org/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { departmentApi } from './api.js';
interface props {
  orgId: string | undefined;
}
export const useDepartment = ({ orgId }: props) => {
  const queryClient = useQueryClient();

  const { data: departments, isLoading: isLoadingDepartments } = useQuery({
    queryFn: departmentApi.getAlldepartments,
    queryKey: ['department', { orgId }],
    retry: false,
  });
  // --- Mutations ---
  const { mutate: createDepartment, isPending: isCreatingDepartment } = useMutation({
    mutationFn: (data: CreateDepartmentInput) => departmentApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['department', { orgId }] });
    },
  });

  const { mutate: updateDepartment, isPending: isUpdatingDepartment } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDepartmentInput }) =>
      departmentApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['department', { orgId }] });
    },
  });

  const { mutate: deleteDepartment, isPending: isDeletingDepartment } = useMutation({
    mutationFn: (roleId: string) => departmentApi.delete(roleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role', { orgId }] });
    },
  });

  return {
    departments,
    isLoadingDepartments,
    createDepartment,
    isCreatingDepartment,
    updateDepartment,
    isUpdatingDepartment,
    deleteDepartment,
    isDeletingDepartment, 
  };
};
