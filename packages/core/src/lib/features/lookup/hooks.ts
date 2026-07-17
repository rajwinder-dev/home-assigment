import { useQuery } from '@tanstack/react-query';
import { lookupApi } from './api.js';
interface props {
  queueId?: string;
  groupId?: string;
  orgId: string | undefined;
}
export const useLookupHook = ({ queueId, groupId, orgId }: props) => {
  const { data: rolesData, isLoading: isLoadingRoles } = useQuery({
    queryFn: () => lookupApi.getRoles(),
    queryKey: ['lookup', 'roles', { orgId }],
    enabled: !!orgId,
  });
  return {
    rolesData,
    isLoadingRoles,
  };
};
