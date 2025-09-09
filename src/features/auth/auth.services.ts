import httpRequest from '@/config/axios.config';
import { RegisterPayLoad } from './types/register-payload';
import { LoginPayload } from './types/login-payload';
import { ApiResponse } from '@/types/api';

export const register = async (payload: RegisterPayLoad) => {
  return await httpRequest.post<ApiResponse>('/auth/register', payload);
};

export const login = async (payload: LoginPayload) => {
  return await httpRequest.post<ApiResponse<{ access_token: string }>>(
    '/auth/login',
    payload
  );
};
