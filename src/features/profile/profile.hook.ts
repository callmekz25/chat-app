import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addNote,
  deleteNote,
  getNote,
  getProfile,
} from '@/features/profile/profile.service';

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getProfile,
  });
};

export const useGetNote = () => {
  return useQuery({
    queryKey: ['note'],
    queryFn: getNote,
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
