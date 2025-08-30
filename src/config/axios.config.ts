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
  baseURL: 'http://localhost:8000/v1',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

httpRequest.interceptors.request.use((req) => {
  const access_token = localStorage.getItem('access_token') ?? null;
  if (access_token) {
    req.headers.Authorization = `Bearer ${access_token}`;
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
          localStorage.setItem('access_token', data?.access_token);
          originalRequest?.headers?.setAuthorization(
            `Bearer ${data?.access_token}`
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
