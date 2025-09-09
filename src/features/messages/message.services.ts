import httpRequest from '@/config/axios.config';
import { ApiResponse } from '@/types/api';
import { Message } from './types/message';

export const getMessagesByConversationId = async (
  conversation_id: string,
  cursor?: string,
  limit: number = 20
) => {
  const { data } = await httpRequest.get<
    ApiResponse<{ messages: Message[]; nextCursor: string }>
  >(`/messages/${conversation_id}`, {
    params: {
      before: cursor,
      limit: Number(limit),
    },
  });
  return data;
};
