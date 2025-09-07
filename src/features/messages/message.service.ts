import httpRequest from '@/config/axios.config';
import { ApiResponse } from '@/types/api';
import { Message } from './types/message';

export const getMessagesByConversationId = async (conversation_id: string) => {
  const { data } = await httpRequest.get<ApiResponse<{ messages: Message[] }>>(
    `/messages/${conversation_id}`
  );
  return data;
};
