import { Message } from '@/modules/messages/types/message';
import { useGetMe } from '@/modules/profile/profile.hooks';
import { useSocket } from '@/shared/contexts/socket.provider';
import { useEffect } from 'react';

type Props = {
  messages: Message[];
  conversationId: string | undefined;
};
const useSeenMessage = ({ messages, conversationId }: Props) => {
  const { data } = useGetMe();
  const socket = useSocket();

  useEffect(() => {
    if (!socket || !data?.user._id) return;
    if (messages.length > 0) {
      const newMessage = [...messages]
        .reverse()
        .find((m) => m.sendBy !== data!.user._id);

      if (newMessage && !newMessage.seenBy.includes(data.user._id)) {
        socket.emit('message:seen', {
          conversationId: conversationId,
          messageId: newMessage._id,
        });
      }
    }
  }, [socket, conversationId, messages, data]);
};

export default useSeenMessage;
