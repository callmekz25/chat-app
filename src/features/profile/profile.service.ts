import httpRequest from '@/config/axios.config';
import { ApiResponse } from '@/types/api';
import { Note, Profile } from './types/entities';

export const getProfile = async () => {
  return await httpRequest.get<ApiResponse<{ user: Profile }>>(
    '/users/profile'
  );
};

export const getNote = async () => {
  return await httpRequest.get<ApiResponse<{ note: Note }>>('/notes');
};
export const addNote = async (content: string) => {
  return await httpRequest.post<ApiResponse<{ note: Note }>>('/notes', {
    content,
  });
};

export const deleteNote = async () => {
  return await httpRequest.delete<ApiResponse>('/notes');
};
