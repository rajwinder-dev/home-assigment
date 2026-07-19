import type { FilterOptions } from '@org/web-utils';
import type { CreateEmployeeInput } from '@org/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { employeeApi } from './api.js';
interface props {
  filterOptions?: FilterOptions;
  orgId: string | undefined;
}
export const useEmployee = ({ filterOptions, orgId }: props) => {
  const queryClient = useQueryClient();
  const {
    data: employees,
    isLoading: isLoadingEmployees,
    error: employeesError,
  } = useQuery({
    queryKey: ['employee', { orgId }, { filterOptions }],
    queryFn: () => employeeApi.getEmployees(filterOptions!),
    enabled: !!orgId,
  });
  const {
    data: employeeTree,
    isLoading: isLoadingEmployeeTree,
    error: employeeTreeError,
  } = useQuery({
    queryKey: ['employee', 'tree', { orgId }],
    queryFn: () => employeeApi.getemployeeTree(),
    enabled: !!orgId,
  });
  const { mutate: updateRoleMutate, isPending: isUpdatingRole } = useMutation({
    mutationFn: ({ roleId, userId }: { roleId: string; userId: string }) =>
      employeeApi.updateRole({ roleId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee', { orgId }] });
    },
  });
  const { mutate: updateMangerMutate, isPending: isUpdatingManager } =
    useMutation({
      mutationFn: ({
        mangerId,
        userId,
      }: {
        mangerId: string;
        userId: string;
      }) => employeeApi.updateManager({ mangerId, userId }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['employee', { orgId }] });
      },
    });
  const { mutate: deleteEmployee, isPending: isDeletingEmployee } = useMutation(
    {
      mutationFn: (userId: string) => employeeApi.deleteEmployee(userId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['employee', { orgId }] });
      },
    },
  );
  const { mutate: createEmployee, isPending: isCreatingEmployee } = useMutation(
    {
      mutationFn: (input: CreateEmployeeInput) =>
        employeeApi.createEmployee(input),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['employee', { orgId }] });
      },
    },
  );
  return {
    employees,
    isLoadingEmployees,
    updateRoleMutate,
    isUpdatingRole,
    employeesError,
    createEmployee,
    isCreatingEmployee,
    updateMangerMutate,
    isUpdatingManager,
    deleteEmployee,
    isDeletingEmployee,
    employeeTree,
    isLoadingEmployeeTree,
    employeeTreeError,
  };
};
