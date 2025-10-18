import { AttachmentType } from '../enums/attachment.enum';

export type UploadedFileResponse = {
  url: string;
  publicId: string;
  type: AttachmentType;
  fileName?: string;
  fileSize?: number;
  fileFormat?: string;
};
