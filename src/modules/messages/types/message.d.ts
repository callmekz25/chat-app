export type Message = {
  _id: string;
  sendBy: string;
  messageType: string;
  isDeleted: boolean;
  isEdited: boolean;
  message: string;
  conversationId: string;
  isSeen: boolean;
  seenBy: string[];
  createdAt: string;
  replyMessage?: string | Message;
};
