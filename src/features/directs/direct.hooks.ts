import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getDirectById,
  getDirects,
  getOrCreateDirect,
} from './direct.services';
import { CreateDirect } from './types/create-direct';
import { useSocket } from '@/shared/contexts/socket.provider';
import { useEffect } from 'react';
import { Direct, FormattedDirect } from './types/direct';
import { useGetMe } from '../profile/profile.hooks';
import { formatDirect } from './utils/format-direct';

export const useGetOrCreateDirect = () => {
  return useMutation({
    mutationFn: (payload: CreateDirect) => getOrCreateDirect(payload),
  });
};

export const useGetDirects = (user_id: string) => {
  const queryClient = useQueryClient();
  const socket = useSocket();
  const query = useQuery({
    queryKey: ['directs'],
    queryFn: getDirects,
    enabled: !!user_id,
    select: (data: { directs: Direct[] }) => ({
      directs: (data.directs ?? []).map((c) => formatDirect(c, user_id)),
    }),
  });

  useEffect(() => {
    if (!socket) return;

    const handleUpdated = (direct: Direct) => {
      const formatted = formatDirect(direct, user_id);

      queryClient.setQueryData<{ directs: FormattedDirect[] }>(
        ['directs'],
        (old) => {
          console.log(old);

          if (!old) return { directs: [formatted] };

          const directs = old.directs ?? [];
          const index = directs.findIndex((c) => c._id === formatted._id);

          let newList: FormattedDirect[];
          if (index !== -1) {
            newList = [...directs];
            newList[index] = formatted;
            newList = [formatted, ...newList.filter((_, i) => i !== index)];
          } else {
            newList = [formatted, ...directs];
          }

          return { directs: newList };
        }
      );
    };

    socket.on('conversation:updated', handleUpdated);
    return () => {
      socket.off('conversation:updated', handleUpdated);
    };
  }, [socket, queryClient, user_id]);

  return query;
};

export const useGetDirectById = (id: string, user_id: string) => {
  return useQuery({
    queryKey: ['direct', id],
    queryFn: () => getDirectById(id),
    enabled: !!id && !!user_id,
    select: (data: { direct: Direct }) => ({
      direct: formatDirect(data.direct, user_id),
    }),
  });
};
