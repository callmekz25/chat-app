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
        conversation_id: string;
        message_id: string;
        user_id: string;
      }) => {
        queryClient.setQueryData<InfiniteData<{ messages: Message[] }>>(
          ['messages', data.conversation_id],
          (old) => {
            if (!old) return old;

            const newPages = old.pages.map((page) => {
              return {
                ...page,
                messages: page.messages.map((m) => {
                  if (m._id === data.message_id) {
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
        // onAutoScroll?.();
      };

      const handleUpdatedNewMessage = (data: {
        conversation_id: string;
        message: Message;
      }) => {
        queryClient.setQueryData<InfiniteData<{ messages: Message[] }>>(
          ['messages', data.conversation_id],
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
