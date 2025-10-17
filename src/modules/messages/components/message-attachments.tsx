import { AttachmentType } from '../enums/attachment.enum';

const MessageAttachments = ({
  attachments,
}: {
  attachments: { url: string; publicId: string; type: AttachmentType }[];
}) => (
  <div
    className={`
      grid gap-[2px] rounded-2xl overflow-hidden mt-1
      ${attachments.length <= 2 ? 'grid-cols-2' : 'grid-cols-2'}
    `}
    style={{ width: attachments.length === 1 ? '220px' : '260px' }}
  >
    {attachments.slice(0, 4).map((att, i) => (
      <div
        key={i}
        className={`relative ${
          attachments.length === 3 && i === 2 ? 'col-span-2' : ''
        }`}
      >
        <img
          src={att.url}
          alt={att.url}
          className='object-cover w-full h-full max-h-[150px] rounded-lg shadow-sm'
        />
        {i === 3 && attachments.length > 4 && (
          <div className='absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg'>
            <span className='text-white font-semibold text-lg'>
              +{attachments.length - 3}
            </span>
          </div>
        )}
      </div>
    ))}
  </div>
);

export default MessageAttachments;
