import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getMessagesByConversationId } from './message.services';
import { useEffect } from 'react';
import { useSocket } from '@/shared/contexts/socket.provider';
import { Message } from './types/message';

export const useGetMessages = (conversation_id: string) => {
  return useQuery({
    queryKey: ['messages', conversation_id],
    queryFn: () => getMessagesByConversationId(conversation_id),
    enabled: !!conversation_id,
  });
};

export const useGetInfiniteMessages = (
  conversation_id: string,
  onNewMessage?: () => void
) => {
  const socket = useSocket();
  const queryClient = useQueryClient();
  const query = useInfiniteQuery({
    queryKey: ['messages', conversation_id],
    queryFn: ({ pageParam }) => {
      return getMessagesByConversationId(
        conversation_id,
        pageParam as string | undefined
      );
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (socket) {
      const handleUpdated = (data: {
        conversation_id: string;
        message: Message;
      }) => {
        if (data.conversation_id !== conversation_id) return;

        queryClient.setQueryData<InfiniteData<{ messages: Message[] }>>(
          ['messages', conversation_id],
          (old) => {
            if (!old) {
              return {
                pages: [{ messages: [data.message] }],
                pageParams: [undefined],
              };
            }
            const pages = [...old.pages];
            pages[0] = {
              ...pages[0],
              messages: [...pages[0].messages, data.message],
            };
            return { ...old, pages };
          }
        );
        onNewMessage?.();
        socket.emit('conversation:seen', {
          conversation_id: conversation_id,
          message_id: data.message._id,
        });
      };
      socket.on('message:new', handleUpdated);
      return () => {
        socket.off('message:new', handleUpdated);
      };
    }
  }, [socket, conversation_id, queryClient]);
  return query;
};
