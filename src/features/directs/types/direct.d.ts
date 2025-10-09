import { Message } from '@/features/messages/types/message';
import { Participant } from './participant';

export type Direct = {
  _id: string;
  name?: string;
  type: 'group' | 'direct';
  participants: Participant[];
  avatar?: {
    url: string;
    publicId: string;
  };
  lastMessage?: Message;
};

export type FormattedDirect = {
  _id: string;
  name: string;
  type: 'group' | 'direct';
  userName?: string;
  avatar?: {
    url: string;
    publicId: string;
  };
  participants: Participant[];
  lastMessage: Message;
};
