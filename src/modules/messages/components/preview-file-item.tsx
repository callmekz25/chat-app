import PlayIcon from '@/shared/components/icons/play-icon';
import { XIcon, FileTextIcon, FileAudioIcon } from 'lucide-react';
import { AttachmentType } from '../enums/attachment.enum';

type Props = {
  file: File;
  url: string;
  type: AttachmentType;
  onRemove: (name: string) => void;
};

const PreviewFileItem = ({ file, url, type, onRemove }: Props) => {
  const renderPreview = () => {
    switch (type) {
      case AttachmentType.IMAGE:
        return (
          <img
            src={url}
            alt={file.name}
            className='size-20 object-cover rounded-lg'
          />
        );
      case AttachmentType.VIDEO:
        return (
          <div className='relative'>
            <video src={url} className='size-20 object-cover rounded-lg' />
            <div className=' absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full p-2 bg-black/50'>
              <PlayIcon className='size-4' />
            </div>
          </div>
        );
      case AttachmentType.AUDIO:
        return (
          <div className='flex flex-col items-center justify-center size-20 bg-gray-100 rounded-lg'>
            <FileAudioIcon className='text-gray-500' />
            <p className='text-xs truncate w-16 text-center'>{file.name}</p>
          </div>
        );

      default:
        return (
          <div className='flex flex-col  items-center justify-center p-2 size-20 bg-gray-300 rounded-lg'>
            <FileTextIcon className='text-gray-500' />
            <p className='text-sm line-clamp-2 w-16 text-center font-medium break-all'>
              {file.name}
            </p>
          </div>
        );
    }
  };

  return (
    <div className='relative border border-gray-200 rounded-lg'>
      {renderPreview()}
      <button
        onClick={() => onRemove(file.name)}
        className='absolute -top-2 -right-2 bg-[#333334] text-white rounded-full p-[2px] hover:cursor-pointer'
      >
        <XIcon className='size-4' />
      </button>
    </div>
  );
};

export default PreviewFileItem;
