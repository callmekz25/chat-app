import { AttachmentType } from '@/modules/messages/enums/attachment.enum';

export const detectFileType = (mime: string): AttachmentType => {
  if (mime.startsWith('image/')) return AttachmentType.IMAGE;
  if (mime.startsWith('video/')) return AttachmentType.VIDEO;
  return AttachmentType.DOCUMENT;
};
