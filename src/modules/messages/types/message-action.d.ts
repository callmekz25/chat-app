import { type Message } from '@/modules/messages/types/message';

export type MessageAction = {
  message: Message;
  action: 'EMOJI' | 'REPLY' | 'FORWARD';
};
