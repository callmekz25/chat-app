import httpRequest from '@/config/axios.config';

export const getProfile = async () => {
  const { data } = await httpRequest.get('/users/profile');
  return data;
};
