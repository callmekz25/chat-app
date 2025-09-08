import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getMessagesByConversationId } from './message.service';

export const useGetMessages = (conversation_id: string) => {
  return useQuery({
    queryKey: ['messages', conversation_id],
    queryFn: () => getMessagesByConversationId(conversation_id),
    enabled: !!conversation_id,
  });
};

export const useGetInfiniteMessages = (conversation_id: string) => {
  return useInfiniteQuery({
    queryKey: ['messages', conversation_id],
    queryFn: ({ pageParam }) => {
      console.log(pageParam);
      return getMessagesByConversationId(
        conversation_id,
        pageParam as string | undefined
      );
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    refetchOnWindowFocus: false,
  });
};
