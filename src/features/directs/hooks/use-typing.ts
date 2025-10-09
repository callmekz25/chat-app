import { useSocket } from '@/shared/contexts/socket.provider';
import { useEffect, useState } from 'react';

const useTyping = (conversationId: string | undefined) => {
  const socket = useSocket();
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  useEffect(() => {
    if (!socket || !conversationId) return;

    socket.on(
      'conversation:typing',
      (payload: { conversationId: string; userId: string }) => {
        if (payload.conversationId === conversationId) {
          setTypingUsers((prev) => new Set([...prev, payload.userId]));
        }
      }
    );

    socket.on('conversation:stopTyping', ({ conversationId: cid, userId }) => {
      if (cid === conversationId) {
        setTypingUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
        });
      }
    });

    return () => {
      socket.off('conversation:typing');
      socket.off('conversation:stopTyping');
    };
  }, [socket, conversationId]);
  return typingUsers;
};
export default useTyping;
