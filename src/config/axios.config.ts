import { reconnectSocket } from '@/shared/socket';
import { saveAccessToken } from '@/shared/utils/save-access-token';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

export interface TypedAxiosInstance extends AxiosInstance {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}
const httpRequest: TypedAxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/v1',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

httpRequest.interceptors.request.use((req) => {
  const accessToken = localStorage.getItem('accessToken') ?? null;
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});
httpRequest.interceptors.response.use(
  (res) => res.data,
  async (error: AxiosError) => {
    const originalRequest = (error.config || {}) as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      error.response.data?.message === 'Token expired' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await httpRequest.post('/auth/refresh-token');
        if (data) {
          saveAccessToken(data?.accessToken);
          originalRequest?.headers?.setAuthorization(
            `Bearer ${data?.accessToken}`
          );
        }
        return httpRequest(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
export default httpRequest;
