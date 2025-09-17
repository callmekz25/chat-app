import { create } from 'zustand';
import { Step } from './types/step';
import { PostData } from './types/post-data';

type CreatePostState = {
  step: Step;
  data: PostData | null;
  setStep: (s: Step) => void;
  setData: (d: Partial<PostData>) => void;
  reset: () => void;
};

export const useCreatePost = create<CreatePostState>((set) => ({
  step: 'select',
  data: null,
  setStep: (s) => set({ step: s }),
  setData: (d) =>
    set(
      (state) => ({ data: { ...state.data, ...d } } as Partial<CreatePostState>)
    ),
  reset: () => set({ step: 'select', data: null }),
}));
