import { Participant } from './participant';

export type Direct = {
  _id: string;
  name: string;
  user_name?: string;
  participants: Participant[];
  avatar?: {
    url: string;
    public_id: string;
  };
  last_message_id?: string;
  last_message_at?: string;
};
