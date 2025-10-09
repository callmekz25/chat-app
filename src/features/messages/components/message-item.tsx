import { useGetMe } from '@/features/profile/profile.hooks';
import { Message } from '../types/message';
import Avatar from '@/shared/components/ui/avatar';
import { getLastSeenMessageId } from '../utils/get-last-seen-message-id';
import React from 'react';
import { MessageAction } from '@/features/messages/types/message-action';
import { EllipsisVerticalIcon, ReplyIcon, SmileIcon } from 'lucide-react';

const MessageItem = ({
  message,
  messages,
  onMessageAction,
}: {
  message: Message;
  messages: Message[];
  onMessageAction: (action: MessageAction) => void;
}) => {
  const { data } = useGetMe();
  const [hoverMessage, setHoverMessage] = React.useState(false);
  const lastSeenMessageId = getLastSeenMessageId(messages, data!.user._id);

  const isMine = data?.user._id === message.userId;
  return (
    <div
      className='flex'
      onMouseEnter={() => setHoverMessage(true)}
      onMouseLeave={() => setHoverMessage(false)}
    >
      <div
        className={`${isMine ? ' ml-auto' : 'mr-auto '} flex items-center  `}
      >
        {!isMine && (
          <div className='flex items-end'>
            <div className='pl-[14px] pr-2'>
              <Avatar className='size-[28px]' />
            </div>
          </div>
        )}
        {hoverMessage && isMine && (
          <div className='mr-2'>
            <div className={'flex item-center gap-3'}>
              <button
                className='cursor-pointer'
                onClick={() =>
                  onMessageAction({
                    message: message,
                    action: 'EMOJI',
                  })
                }
              >
                <SmileIcon className='size-5' />
              </button>
              <button
                className='cursor-pointer'
                onClick={() =>
                  onMessageAction({
                    message: message,
                    action: 'REPLY',
                  })
                }
              >
                <ReplyIcon className='size-5' />
              </button>
              <button
                className='cursor-pointer'
                onClick={() =>
                  onMessageAction({
                    message: message,
                    action: 'FORWARD',
                  })
                }
              >
                <EllipsisVerticalIcon className='size-5' />
              </button>
            </div>
          </div>
        )}

        <div className={` flex flex-col items-end `}>
          <div
            className={` w-fit py-1  px-3 rounded-[18px] relative max-w-[564px] ${
              isMine ? 'bg-[#3797F0]' : ' bg-[#262626]'
            }`}
          >
            <span className='text-[15px] font-normal break-words leading-5'>
              {message.message}
            </span>
          </div>

          {message._id === lastSeenMessageId && (
            <div className='px-3'>
              <span className='text-[12px] opacity-80 leading-4'>Seen</span>
            </div>
          )}
        </div>
        {hoverMessage && !isMine && (
          <div className='ml-2'>
            <div className={'flex item-center gap-3'}>
              <button
                className='cursor-pointer'
                onClick={() =>
                  onMessageAction({
                    message: message,
                    action: 'EMOJI',
                  })
                }
              >
                <SmileIcon className='size-5' />
              </button>
              <button
                className='cursor-pointer'
                onClick={() =>
                  onMessageAction({
                    message: message,
                    action: 'REPLY',
                  })
                }
              >
                <ReplyIcon className='size-5' />
              </button>
              <button
                className='cursor-pointer'
                onClick={() =>
                  onMessageAction({
                    message: message,
                    action: 'FORWARD',
                  })
                }
              >
                <EllipsisVerticalIcon className='size-5' />
              </button>
            </div>
          </div>
        )}

        {isMine && <div className='w-4'></div>}
      </div>
    </div>
  );
};

export default MessageItem;
