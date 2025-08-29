import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/features/profile/profile.service';

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getProfile,
  });
};
