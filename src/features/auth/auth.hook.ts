import { useMutation } from '@tanstack/react-query';
import { RegisterPayLoad } from './types/register-payload';
import { login, register } from './auth.service';
import { LoginPayload } from './types/login-payload';

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayLoad) => register(payload),
  });
};
export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
  });
};
