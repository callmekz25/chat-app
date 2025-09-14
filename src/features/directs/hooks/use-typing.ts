import { useSocket } from '@/shared/contexts/socket.provider';
import { useEffect, useState } from 'react';

const useTyping = (conversation_id: string | undefined) => {
  const socket = useSocket();
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  useEffect(() => {
    if (!socket || !conversation_id) return;

    socket.on(
      'conversation:typing',
      (payload: { conversation_id: string; user_id: string }) => {
        if (payload.conversation_id === conversation_id) {
          setTypingUsers((prev) => new Set([...prev, payload.user_id]));
        }
      }
    );

    socket.on(
      'conversation:stop_typing',
      ({ conversation_id: cid, user_id }) => {
        if (cid === conversation_id) {
          setTypingUsers((prev) => {
            const newSet = new Set(prev);
            newSet.delete(user_id);
            return newSet;
          });
        }
      }
    );

    return () => {
      socket.off('conversation:typing');
      socket.off('conversation:stop_typing');
    };
  }, [socket, conversation_id]);
  return typingUsers;
};
export default useTyping;
