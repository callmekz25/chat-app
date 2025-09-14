import { Message } from '@/features/messages/types/message';
import { RefObject, useEffect, useRef } from 'react';

type Props = {
  bottomRef: RefObject<HTMLDivElement | null>;
  messages: Message[];
  typingUsers: Set<string>;
  conversation_id: string | undefined;
};
const useScroll = ({
  bottomRef,
  messages,
  typingUsers,
  conversation_id,
}: Props) => {
  const isFirstLoad = useRef(true);
  // Handle scroll last message
  useEffect(() => {
    isFirstLoad.current = true;
  }, [conversation_id]);

  useEffect(() => {
    if (typingUsers.size > 0) {
      requestAnimationFrame(() => {
        bottomRef?.current?.scrollIntoView({
          behavior: 'smooth',
        });
      });
    }
  }, [typingUsers.size]);

  useEffect(() => {
    if (messages.length && isFirstLoad.current) {
      requestAnimationFrame(() => {
        bottomRef?.current?.scrollIntoView({ behavior: 'auto' });
      });
      isFirstLoad.current = false;
    }
  }, [messages, conversation_id]);
};
export default useScroll;
