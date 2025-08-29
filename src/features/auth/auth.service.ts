import httpRequest from '@/config/axios.config';
import { RegisterPayLoad } from './types/register-payload';
import { LoginPayload } from './types/login-payload';

export const register = async (payload: RegisterPayLoad) => {
  const { data } = await httpRequest.post('/auth/register', payload);
  return data;
};

export const login = async (payload: LoginPayload) => {
  const { data } = await httpRequest.post('/auth/login', payload);
  return data;
};
