export type Message = {
  _id: string;
  userId: string;
  messageType: string;
  isDeleted: boolean;
  isEdited: boolean;
  message: string;
  conversationId: string;
  isSeen: boolean;
  seenBy: string[];
  createdAt: string;
  replyMessageId?: string | Message;
};
