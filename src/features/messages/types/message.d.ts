export type Message = {
  _id: string;
  message_type: string;
  is_deleted: boolean;
  is_edited: boolean;
  message: string;
  conversation_id: string;
};
