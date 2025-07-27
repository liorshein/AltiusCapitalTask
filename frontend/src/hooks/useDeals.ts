import { useQuery } from '@tanstack/react-query';
import { getDealsApi } from '@/services/api';
import type { Deal } from '@/types';

export const useDeals = () => {
  return useQuery<Deal[]>({
    queryKey: ['deals'],
    queryFn: getDealsApi,
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};