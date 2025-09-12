import { Message } from '@/features/messages/types/message';
import { Participant } from './participant';

export type Direct = {
  _id: string;
  name?: string;
  type: 'group' | 'direct';
  participants: Participant[];
  avatar?: {
    url: string;
    public_id: string;
  };
  last_message?: string | Message;
  last_message_at?: string;
};

export type FormattedDirect = {
  _id: string;
  name: string;
  type: 'group' | 'direct';
  user_name?: string;
  avatar?: {
    url: string;
    public_id: string;
  };
  last_message: Message;
  last_message_at?: string;
};
