import { User } from '@/features/user/types/user';

export type Participant = {
  user: User;

  role: 'member' | 'leader';

  joinedAt: string;

  lastSeenMessage?: string;
};
