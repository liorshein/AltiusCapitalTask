import { useQuery } from '@tanstack/react-query';
import { validateSessionApi } from '@/services/api';

export const useAuth = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['auth', 'validate'],
    queryFn: validateSessionApi,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    isAuthenticated: !!data?.valid,
    isLoading,
    error,
    sessionData: data,
  };
};