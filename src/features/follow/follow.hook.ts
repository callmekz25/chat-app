import { useMutation, useQuery } from '@tanstack/react-query';
import { followUser, getFollowers, getFollowings } from './follow.service';

export const useGetFollowers = (user_name: string) => {
  return useQuery({
    queryKey: ['followers', user_name],
    queryFn: () => getFollowers(user_name),
    enabled: !!user_name,
  });
};
export const useGetFollowings = (user_name: string) => {
  return useQuery({
    queryKey: ['followings', user_name],
    queryFn: () => getFollowings(user_name),
    enabled: !!user_name,
  });
};

export const useFollowUser = () => {
  return useMutation({
    mutationFn: (user_name: string) => followUser(user_name),
  });
};
