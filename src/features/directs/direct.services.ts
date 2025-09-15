import httpRequest from '@/config/axios.config';
import { ApiResponse } from '@/types/api';
import { Direct } from './types/direct';
import { CreateDirect } from './types/create-direct';

export const getOrCreateDirect = async (payload: CreateDirect) => {
  const { data } = await httpRequest.post<
    ApiResponse<{ conversation_id: string }>
  >('conversations', payload);
  return data;
};

export const getDirects = async () => {
  const { data } = await httpRequest.get<ApiResponse<{ directs: Direct[] }>>(
    'conversations'
  );
  return data;
};

export const getDirectById = async (id: string) => {
  const { data } = await httpRequest.get<ApiResponse<{ direct: Direct }>>(
    `/conversations/${id}`
  );
  return data;
};
