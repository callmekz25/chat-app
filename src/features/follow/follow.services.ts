import httpRequest from '@/config/axios.config';
import { ApiResponse } from '@/types/api';
import { User } from '../user/types/user';

export const getFollowers = async (userName: string) => {
  const { data } = await httpRequest.get<
    ApiResponse<{
      followers: {
        follower: User;
        status: string;
      }[];
    }>
  >(`/users/${userName}/followers`);
  return data;
};
export const getFollowings = async (userName: string) => {
  const { data } = await httpRequest.get<
    ApiResponse<{
      followings: {
        following: User;
        status: string;
      }[];
    }>
  >(`/users/${userName}/followings`);
  return data;
};

export const followUser = async (userName: string) => {
  return await httpRequest.post<ApiResponse>(`/users/${userName}/follow`);
};
