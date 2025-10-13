import { Message } from '@/modules/messages/types/message';
import { MessageAction } from '@/modules/messages/types/message-action';
import { useSocket } from '@/shared/contexts/socket.provider';
import { RefObject, useEffect, useRef } from 'react';

type Props = {
  bottomRef: RefObject<HTMLDivElement | null>;
  messages: Message[];
  typingUsers: Set<string>;
  conversationId: string | undefined;
  messageAction: MessageAction | null;
};
const useScroll = ({
  bottomRef,
  messages,
  typingUsers,
  conversationId,
  messageAction,
}: Props) => {
  const isFirstLoad = useRef(true);
  const socket = useSocket();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageAction, bottomRef]);

  useEffect(() => {
    if (!socket || !conversationId) return;
    const handleNewMessage = (data: {
      conversationId: string;
      message: Message;
    }) => {
      if (data.conversationId === conversationId) {
        requestAnimationFrame(() => {
          bottomRef?.current?.scrollIntoView({
            behavior: 'smooth',
          });
        });
      }
    };
    socket.on('message:new', handleNewMessage);
    return () => {
      socket.off('message:new', handleNewMessage);
    };
  }, [socket, conversationId, bottomRef]);

  // Handle scroll last message
  useEffect(() => {
    isFirstLoad.current = true;
  }, [conversationId]);

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
  }, [messages, conversationId]);
};
export default useScroll;
