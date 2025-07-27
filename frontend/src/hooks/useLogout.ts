import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutApi } from '@/services/api';
import { useNavigate } from 'react-router';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear();
      navigate('/login');
    },
  });
};