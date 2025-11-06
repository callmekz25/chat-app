import { User } from '@/modules/user/types/user';

export type Message = {
  _id: string;
  tempId: string | null;
  sendBy: User;
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
    isLoading: boolean;
  }[];
  status?: string;
};
