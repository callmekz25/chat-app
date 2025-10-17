export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  VOICE = 'voice',
  FILE = 'file',
  VIDEO = 'video',
}

export type Message = {
  _id: string;
  tempId: string;
  sendBy: string;
  messageType: string;
  isDeleted: boolean;
  isEdited: boolean;
  message: string;
  conversationId: string;
  isSeen: boolean;
  seenBy: string[];
  createdAt: string;
  replyMessage?: Message;
  attachments?: {
    url: string;
    publicId: string;
    type: AttachmentType;
    fileName?: string;
    fileSize?: number;
    duration?: number;
    width?: number;
    height?: number;
  }[];
  status?: string;
};
