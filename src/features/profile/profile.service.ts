import httpRequest from '@/config/axios.config';
import { ApiResponse } from '@/types/api';
import { Profile } from './types/profile';
import { Relations } from './types/relations';
import { Note } from './types/note';

export const getProfile = async (user_name: string) => {
  return await httpRequest.get<
    ApiResponse<{ user: Profile; relations: Relations; note: Note }>
  >(`/profile/${user_name}`);
};

export const getMe = async () => {
  return await httpRequest.get<ApiResponse<{ user: Profile }>>('/profile/me');
};

export const addNote = async (content: string) => {
  return await httpRequest.post<ApiResponse<{ note: Note }>>('profile/note', {
    content,
  });
};

export const deleteNote = async () => {
  return await httpRequest.delete<ApiResponse>('profile/note');
};
