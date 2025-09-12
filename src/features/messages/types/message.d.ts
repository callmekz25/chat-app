export type Message = {
  _id: string;
  user_id: string;
  message_type: string;
  is_deleted: boolean;
  is_edited: boolean;
  message: string;
  conversation_id: string;
  is_seen: boolean;
  seen_by: string[];
  createdAt: string;
};
