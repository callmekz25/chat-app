import httpRequest from '@/config/axios.config';
import { ApiResponse } from '@/types/api';
import { Profile } from './types/entities';

export const getProfile = async () => {
  return await httpRequest.get<ApiResponse<{ user: Profile }>>(
    '/users/profile'
  );
};
