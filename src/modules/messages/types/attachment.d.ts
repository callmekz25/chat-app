import { AttachmentType } from '../enums/attachment.enum';

export type Attachment = {
  url: string;
  publicId: string;
  type: AttachmentType;
  fileName?: string;
  fileSize?: number;
  duration?: number;
  width?: number;
  height?: number;
  isLoading: boolean;
};
