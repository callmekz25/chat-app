import { InfiniteData, QueryClient } from '@tanstack/react-query';
import { Message } from '../types/message';

export const appendMessageToCache = (
  queryClient: QueryClient,
  conversationId: string,
  newMessage: Message
) => {
  queryClient.setQueryData<InfiniteData<{ messages: Message[] }>>(
    ['messages', conversationId],
    (old) => {
      if (!old) {
        return {
          pages: [{ messages: [newMessage] }],
          pageParams: [undefined],
        };
      }

      const pages = [...old.pages];
      pages[0] = {
        ...pages[0],
        messages: [...pages[0].messages, newMessage],
      };

      return { ...old, pages };
    }
  );
};
export const replaceMessageInCache = (
  queryClient: QueryClient,
  conversationId: string,
  newMessage: Message,
  replaceMessageId: string
) => {
  queryClient.setQueryData<InfiniteData<{ messages: Message[] }>>(
    ['messages', conversationId],
    (old) => {
      if (!old) {
        return {
          pages: [{ messages: [newMessage] }],
          pageParams: [undefined],
        };
      }

      const pages = old.pages.map((page) => ({
        ...page,
        messages: page.messages.map((m) =>
          m.tempId === replaceMessageId ? newMessage : m
        ),
      }));

      return { ...old, pages };
    }
  );
};

export const updateSeenMessageToCache = (
  queryClient: QueryClient,
  conversationId: string,
  messageId: string,
  userId: string
) => {
  queryClient.setQueryData<InfiniteData<{ messages: Message[] }>>(
    ['messages', conversationId],
    (old) => {
      if (!old) return old;

      const newPages = old.pages.map((page) => {
        return {
          ...page,
          messages: page.messages.map((m) => {
            if (m._id === messageId) {
              const seenBy = m.seenBy.includes(userId)
                ? m.seenBy
                : [...m.seenBy, userId];

              return { ...m, seenBy: seenBy };
            }
            return m;
          }),
        };
      });

      return { ...old, pages: newPages };
    }
  );
};
