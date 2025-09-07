import { Profile } from '@/features/profile/types/profile';

export type Participant = {
  user: Profile | string;

  role: 'member' | 'leader';

  joined_at: string;

  last_read_at?: string;
};
