import { useInfiniteQuery } from '@tanstack/react-query';
import { getMessagesByConversationId } from '../message.services';
import { useRef } from 'react';

export const useGetMessages = (conversationId: string) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    data: messagesRes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['messages', conversationId],
    enabled: !!conversationId,
    queryFn: ({ pageParam }) => {
      return getMessagesByConversationId(
        conversationId,
        pageParam as string | undefined
      );
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    refetchOnWindowFocus: false,
  });
  const messages = (messagesRes?.pages ?? [])
    .slice()
    .reverse()
    .flatMap((p) => p.messages);

  // Handle load old messages
  const handleTopReached = async () => {
    if (!hasNextPage || isFetching) return;

    const el = containerRef.current!;
    const prevHeight = el.scrollHeight;
    const prevTop = el.scrollTop;

    await fetchNextPage();

    requestAnimationFrame(() => {
      const newHeight = el.scrollHeight;
      el.scrollTop = prevTop + (newHeight - prevHeight);
    });
  };

  return {
    containerRef,
    messages,
    isLoading,
    isFetchingNextPage,
    handleTopReached,
  };
};
