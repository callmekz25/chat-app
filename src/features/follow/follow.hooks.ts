import { useMutation, useQuery } from '@tanstack/react-query';
import { followUser, getFollowers, getFollowings } from './follow.services';

export const useGetFollowers = (userName: string) => {
  return useQuery({
    queryKey: ['followers', userName],
    queryFn: () => getFollowers(userName),
    enabled: !!userName,
  });
};
export const useGetFollowings = (userName: string) => {
  return useQuery({
    queryKey: ['followings', userName],
    queryFn: () => getFollowings(userName),
    enabled: !!userName,
  });
};

export const useFollowUser = () => {
  return useMutation({
    mutationFn: (userName: string) => followUser(userName),
  });
};
