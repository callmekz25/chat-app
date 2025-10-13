import { Message } from '@/modules/messages/types/message';
import { Participant } from './participant';

export type Direct = {
  _id: string;
  name: string;
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
  avatar?: {
    url: string;
    publicId: string;
  };
  participants: Participant[];
  lastMessage: Message;
};
