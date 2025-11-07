import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../user.services';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};
