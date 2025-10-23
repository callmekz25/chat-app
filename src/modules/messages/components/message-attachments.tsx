import { FileAudioIcon, FileTextIcon } from 'lucide-react';
import { AttachmentType } from '../enums/attachment.enum';
import { Attachment } from '../types/attachment';
import { formatFileSize } from '@/shared/utils/format-file-size';

const MessageAttachments = ({
  attachments,
  isMine,
}: {
  attachments: Attachment[];
  isMine: boolean;
}) => {
  const renderAttachments = (attachment: Attachment) => {
    switch (attachment.type) {
      case AttachmentType.IMAGE:
        return (
          <img
            src={attachment.url}
            alt={attachment.url}
            height={475}
            className='object-fill max-w-[280px] max-h-[400px] rounded-lg shadow-sm'
          />
        );

      case AttachmentType.VIDEO:
        return (
          <video
            src={attachment.url}
            className='object-cover w-[150px] h-[200px] rounded-lg shadow-sm'
            controls
          />
        );

      case AttachmentType.DOCUMENT:
        return (
          <a
            href={`${attachment.url}`}
            download={`${attachment.fileName}`}
            className='flex  gap-3  items-center justify-center py-3 px-4  bg-gray-300 rounded-2xl'
          >
            <FileTextIcon className='text-gray-500 size-7' />
            <div className='flex flex-col '>
              <p className='text-[15px]  text-center font-medium'>
                {attachment.fileName}
              </p>
              <span className='text-[13px] opacity-60 font-medium'>
                {attachment.fileSize
                  ? formatFileSize(attachment.fileSize!)
                  : ''}
              </span>
            </div>
          </a>
        );

      default:
        return (
          <div className='flex flex-col items-center justify-center '>
            <FileAudioIcon className='text-gray-500' />
            <p className='text-xs truncate w-16 text-center'>
              {attachment.fileName}
            </p>
            <span>{attachment.fileSize}</span>
          </div>
        );
    }
  };
  return (
    <div
      className={`flex flex-col gap-2  ${isMine ? 'items-end' : 'items-start'}`}
    >
      {attachments.map((att) => {
        return <div className=''>{renderAttachments(att)}</div>;
      })}
    </div>
  );
};

export default MessageAttachments;
