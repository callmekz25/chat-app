import { useSocket } from '@/shared/contexts/socket.provider';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Message } from '../types/message';

export const useSocketMessageEvents = () => {
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (socket) {
      const handleUpdatedSeenMessage = (data: {
        conversationId: string;
        messageId: string;
        userId: string;
      }) => {
        queryClient.setQueryData<InfiniteData<{ messages: Message[] }>>(
          ['messages', data.conversationId],
          (old) => {
            if (!old) return old;

            const newPages = old.pages.map((page) => {
              return {
                ...page,
                messages: page.messages.map((m) => {
                  if (m._id === data.messageId) {
                    const seenBy = m.seenBy.includes(data.userId)
                      ? m.seenBy
                      : [...m.seenBy, data.userId];

                    return { ...m, seenBy: seenBy };
                  }
                  return m;
                }),
              };
            });

            return { ...old, pages: newPages };
          }
        );
        // onAutoScroll?.();
      };

      const handleUpdatedNewMessage = (data: {
        conversationId: string;
        message: Message;
      }) => {
        queryClient.setQueryData<InfiniteData<{ messages: Message[] }>>(
          ['messages', data.conversationId],
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
      };
      socket.on('message:new', handleUpdatedNewMessage);
      socket.on('message:seen:updated', handleUpdatedSeenMessage);
      return () => {
        socket.off('message:new', handleUpdatedNewMessage);
        socket.off('message:seen:updated', handleUpdatedSeenMessage);
      };
    }
  }, [socket, queryClient]);
};
