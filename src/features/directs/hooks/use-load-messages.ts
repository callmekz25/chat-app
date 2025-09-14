import { useGetInfiniteMessages } from '@/features/messages/message.hooks';
import { RefObject, useRef } from 'react';

const useLoadMessages = (
  conversation_id: string | undefined,
  bottomRef: RefObject<HTMLDivElement | null>
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    data: messagesRes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useGetInfiniteMessages(conversation_id!, () => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    });
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

export default useLoadMessages;
