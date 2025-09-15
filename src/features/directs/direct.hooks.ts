import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getDirectById,
  getDirects,
  getOrCreateDirect,
} from './direct.services';
import { CreateDirect } from './types/create-direct';
import { useSocket } from '@/shared/contexts/socket.provider';
import { useEffect } from 'react';
import { Direct } from './types/direct';
import { Profile } from '../profile/types/profile';

export const useGetOrCreateDirect = () => {
  return useMutation({
    mutationFn: (payload: CreateDirect) => getOrCreateDirect(payload),
  });
};

export const useGetDirects = () => {
  const queryClient = useQueryClient();
  const socket = useSocket();
  const query = useQuery({
    queryKey: ['directs'],
    queryFn: getDirects,
  });

  useEffect(() => {
    if (!socket) return;

    const handleDirectSeenUpdated = (payload: {
      conversation_id: string;
      message_id: string;
      user_id: string;
    }) => {
      queryClient.setQueryData<{ directs: Direct[] }>(['directs'], (old) => {
        if (!old) return old;
        return {
          directs: old.directs.map((direct) => {
            if (direct._id !== payload.conversation_id) return direct;
            return {
              ...direct,
              participants: direct.participants.map((p) =>
                (p.user as Profile)._id === payload.user_id
                  ? { ...p, last_seen_message: payload.message_id }
                  : p
              ),
            };
          }),
        };
      });
    };

    const handlePositionDirectsUpdated = (direct: Direct) => {
      queryClient.setQueryData<{ directs: Direct[] }>(['directs'], (old) => {
        if (!old) return { directs: [direct] };

        const directs = old.directs ?? [];
        const index = directs.findIndex((c) => c._id === direct._id);

        let newList: Direct[];
        if (index !== -1) {
          newList = [...directs];
          newList[index] = direct;
          newList = [direct, ...newList.filter((_, i) => i !== index)];
        } else {
          newList = [direct, ...directs];
        }

        return { directs: newList };
      });
    };

    socket.on('conversation:updated', handlePositionDirectsUpdated);
    socket.on('message:seen:updated', handleDirectSeenUpdated);
    return () => {
      socket.off('conversation:updated', handlePositionDirectsUpdated);
      socket.off('message:seen:updated', handleDirectSeenUpdated);
    };
  }, [socket, queryClient]);

  return query;
};

export const useGetDirectById = (id: string) => {
  return useQuery({
    queryKey: ['direct', id],
    queryFn: () => getDirectById(id),
    enabled: !!id,
  });
};
