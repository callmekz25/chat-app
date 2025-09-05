import httpRequest from '@/config/axios.config';
import { ApiResponse } from '@/types/api';
import { Profile } from '../profile/types/profile';

export const getFollowers = async (user_name: string) => {
  const { data } = await httpRequest.get<
    ApiResponse<{
      followers: {
        follower: Profile;
        status: string;
      }[];
    }>
  >(`/users/${user_name}/followers`);
  return data;
};
export const getFollowings = async (user_name: string) => {
  const { data } = await httpRequest.get<
    ApiResponse<{
      followings: {
        following: Profile;
        status: string;
      }[];
    }>
  >(`/users/${user_name}/followings`);
  return data;
};

export const followUser = async (user_name: string) => {
  return await httpRequest.post<ApiResponse>(`/users/${user_name}/follow`);
};
