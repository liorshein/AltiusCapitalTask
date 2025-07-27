import { useMutation } from '@tanstack/react-query';
import { downloadDealApi, ApiError } from '@/services/api';
import { toast } from 'sonner';

type DownloadResponse = {
  file_url: string;
};

export const useDownloadDealFile = () => {
  return useMutation<DownloadResponse, ApiError, number>({
    mutationFn: downloadDealApi,
    onSuccess: (response, dealId) => {
      const fileUrl = response.file_url;
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `deal_${dealId}.pdf`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Deal download started!');
    },
    onError: (error) => {
      toast.error(`Failed to get download link: ${error.message}`);
    },
  });
};