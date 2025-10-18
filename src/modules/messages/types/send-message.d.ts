import { AttachmentType } from '../enums/attachment.enum';

export type SendMessage = {
  conversationId: string;

  tempId: string;

  message: string;

  messageType: MessageType;

  replyMessageId: string | null;

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
};
