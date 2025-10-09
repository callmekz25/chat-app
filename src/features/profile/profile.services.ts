import httpRequest from '@/config/axios.config';
import { ApiResponse } from '@/types/api';
import { User } from '../user/types/user';
import { Relations } from './types/relations';
import { Note } from './types/note';

export const getProfile = async (user_name: string) => {
  const { data } = await httpRequest.get<
    ApiResponse<{ user: User; relations: Relations; note: Note }>
  >(`/profile/${user_name}`);
  return data;
};

export const getMe = async () => {
  const { data } = await httpRequest.get<ApiResponse<{ user: User }>>(
    '/profile/me'
  );
  return data;
};

export const addNote = async (content: string) => {
  return await httpRequest.post<ApiResponse<{ note: Note }>>('profile/note', {
    content,
  });
};

export const deleteNote = async () => {
  return await httpRequest.delete<ApiResponse>('profile/note');
};
