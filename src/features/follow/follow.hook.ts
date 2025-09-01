import { useMutation, useQuery } from '@tanstack/react-query';
import { followUser, getFollowers, getFollowings } from './follow.service';

export const useGetMyFollowers = (user_name: string) => {
  return useQuery({
    queryKey: ['followers', user_name],
    queryFn: () => getFollowers(user_name),
  });
};
export const useGetMyFollowings = (user_name: string) => {
  return useQuery({
    queryKey: ['followings', user_name],
    queryFn: () => getFollowings(user_name),
  });
};

export const useFollowUser = () => {
  return useMutation({
    mutationFn: (user_name: string) => followUser(user_name),
  });
};
