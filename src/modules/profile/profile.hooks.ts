import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/modules/profile/profile.services';

export const useGetMe = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getMe,
  });
};
