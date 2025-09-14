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
      const handleUpdatedSeenMessage = (data: {
        conversation_id: string;
        message_id: string;
        user_id: string;
      }) => {
        if (data.conversation_id !== conversation_id) return;

        queryClient.setQueryData<InfiniteData<{ messages: Message[] }>>(
          ['messages', conversation_id],
          (old) => {
            if (!old) return old;

            const newPages = old.pages.map((page) => {
              return {
                ...page,
                messages: page.messages.map((m) => {
                  if (m._id === data.message_id) {
                    // tránh duplicate
                    const seenBy = m.seen_by.includes(data.user_id)
                      ? m.seen_by
                      : [...m.seen_by, data.user_id];

                    return { ...m, seen_by: seenBy };
                  }
                  return m;
                }),
              };
            });

            return { ...old, pages: newPages };
          }
        );
      };

      const handleUpdatedNewMessage = (data: {
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
      };
      socket.on('message:new', handleUpdatedNewMessage);
      socket.on('conversation:seen:updated', handleUpdatedSeenMessage);
      return () => {
        socket.off('message:new', handleUpdatedNewMessage);
        socket.off('conversation:seen:updated', handleUpdatedSeenMessage);
      };
    }
  }, [socket, conversation_id, queryClient, onNewMessage]);
  return query;
};
