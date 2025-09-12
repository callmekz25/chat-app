import httpRequest from '@/config/axios.config';
import { ApiResponse } from '@/types/api';
import { FormattedDirect } from './types/direct';
import { CreateDirect } from './types/create-direct';

export const getOrCreateDirect = async (payload: CreateDirect) => {
  const { data } = await httpRequest.post<
    ApiResponse<{ conversation_id: string }>
  >('conversations', payload);
  return data;
};

export const getDirects = async () => {
  const { data } = await httpRequest.get<
    ApiResponse<{ directs: FormattedDirect[] }>
  >('conversations');
  return data;
};

export const getDirectById = async (id: string) => {
  const { data } = await httpRequest.get<
    ApiResponse<{ direct: FormattedDirect }>
  >(`/conversations/${id}`);
  return data;
};
