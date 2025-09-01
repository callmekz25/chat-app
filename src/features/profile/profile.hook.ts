import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addNote,
  deleteNote,
  getMe,
  getProfile,
} from '@/features/profile/profile.service';

export const useGetMe = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getMe,
  });
};
export const useGetProfile = (user_name: string) => {
  return useQuery({
    queryKey: ['user-profile', user_name],
    queryFn: () => getProfile(user_name),
  });
};

export const useAddNote = () => {
  return useMutation({
    mutationFn: (content: string) => addNote(content),
  });
};

export const useDeleteNote = () => {
  return useMutation({
    mutationFn: deleteNote,
  });
};
