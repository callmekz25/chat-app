import { useQuery } from '@tanstack/react-query';
import { getMessagesByConversationId } from './message.service';

export const useGetMessages = (conversation_id: string) => {
  return useQuery({
    queryKey: ['messages', conversation_id],
    queryFn: () => getMessagesByConversationId(conversation_id),
    enabled: !!conversation_id,
  });
};
