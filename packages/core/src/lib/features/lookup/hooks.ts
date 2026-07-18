import { useQuery } from '@tanstack/react-query';
import { lookupApi } from './api.js';
interface props {
  orgId: string | undefined;
}
export const useLookupHook = ({ orgId }: props) => {
  const { data: rolesData, isLoading: isLoadingRoles } = useQuery({
    queryFn: () => lookupApi.getRoles(),
    queryKey: ['lookup', 'roles', { orgId }],
    enabled: !!orgId,
  });
  const { data: managersData, isLoading: isLoadingMangers } = useQuery({
    queryFn: () => lookupApi.getMangers(),
    queryKey: ['lookup', 'mangers', { orgId }],
    enabled: !!orgId,
  });
  const { data: departmentsData, isLoading: isLoadingDepartments } = useQuery({
    queryFn: () => lookupApi.getDepartments(),
    queryKey: ['lookup', 'departments', { orgId }],
    enabled: !!orgId,
  });
  return {
    rolesData,
    isLoadingRoles,
    managersData,
    isLoadingMangers,
    departmentsData,
    isLoadingDepartments,
  };
};
