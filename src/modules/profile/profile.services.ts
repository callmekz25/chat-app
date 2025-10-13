import httpRequest from '@/config/axios.config';
import { ApiResponse } from '@/types/api';
import { User } from '../user/types/user';

export const getMe = async () => {
  const { data } = await httpRequest.get<ApiResponse<{ user: User }>>(
    '/profile/me'
  );
  return data;
};
