import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginApi, ApiError } from '@/services/api';
import type { LoginRequest, LoginResponse } from '@/types';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, ApiError, LoginRequest>({
    mutationKey: ['login'],
    mutationFn: loginApi,
    onSuccess: () => {
      // Invalidate auth queries to refetch user session after login
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
};