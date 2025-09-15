import { Message } from '@/features/messages/types/message';
import { useGetMe } from '@/features/profile/profile.hooks';
import { useSocket } from '@/shared/contexts/socket.provider';
import { useEffect } from 'react';

type Props = {
  messages: Message[];
  conversation_id: string | undefined;
};
const useSeenMessage = ({ messages, conversation_id }: Props) => {
  const { data } = useGetMe();
  const socket = useSocket();

  useEffect(() => {
    if (!socket || !data?.user._id) return;
    if (messages.length > 0) {
      const newMessage = [...messages]
        .reverse()
        .find((m) => m.user_id !== data!.user._id);

      if (newMessage && !newMessage.seen_by.includes(data.user._id)) {
        socket.emit('message:seen', {
          conversation_id: conversation_id,
          message_id: newMessage._id,
        });
      }
    }
  }, [socket, conversation_id, messages, data]);
};

export default useSeenMessage;
