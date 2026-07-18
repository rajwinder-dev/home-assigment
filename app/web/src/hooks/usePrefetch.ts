import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';

export function useOrgPrefetch() {
  const queryClient = useQueryClient();
  const { orgId } = useParams();

  useEffect(() => {
    if (!orgId) return;


    const prefetchCoreData = async () => {
      try {
      } catch (error) {
        console.error('Failed to prefetch organization data:', error);
      }
    };

    prefetchCoreData();
  }, [orgId, queryClient]);
}
