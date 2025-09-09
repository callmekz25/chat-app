import { useMutation, useQuery } from '@tanstack/react-query';
import { getDirectById, getDirects, getOrCreateDirect } from './direct.services';
import { CreateDirect } from './types/create-direct';

export const useGetOrCreateDirect = () => {
  return useMutation({
    mutationFn: (payload: CreateDirect) => getOrCreateDirect(payload),
  });
};

export const useGetDirects = () => {
  return useQuery({
    queryKey: ['directs'],
    queryFn: getDirects,
  });
};

export const useGetDirectById = (id: string) => {
  return useQuery({
    queryKey: ['direct', id],
    queryFn: () => getDirectById(id),
    enabled: !!id,
  });
};
