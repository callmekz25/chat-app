import { useGetMe } from '@/modules/profile/profile.hooks';
import { Message } from '../types/message';
import Avatar from '@/shared/components/ui/avatar';
import { getLastSeenMessageId } from '../utils/get-last-seen-message-id';
import React from 'react';
import { MessageAction } from '@/modules/messages/types/message-action';
import MessageActions from './message-actions';
import MessageBubble from './message-bubble';
import MessageAttachments from './message-attachments';
import MessageSeenStatus from './message-seen-status';

const MessageItem = ({
  message,
  messages,
  onMessageAction,
  nextMessage,
}: {
  message: Message;
  messages: Message[];
  onMessageAction: (action: MessageAction) => void;
  nextMessage: Message;
}) => {
  const { data } = useGetMe();
  const [hoverMessage, setHoverMessage] = React.useState(false);
  const lastSeenMessageId = getLastSeenMessageId(messages, data!.user._id);

  const isMine = data?.user._id === message.sendBy._id;

  const isLastMessageOfSameUser =
    !nextMessage || nextMessage.sendBy !== message.sendBy;
  return (
    <div
      className='flex'
      onMouseEnter={() => setHoverMessage(true)}
      onMouseLeave={() => setHoverMessage(false)}
    >
      <div
        className={`${isMine ? ' ml-auto' : 'mr-auto '} flex items-center  `}
      >
        {!isMine && isLastMessageOfSameUser && (
          <div className='flex items-end'>
            <div className='pl-[14px] pr-2'>
              <Avatar className='size-7' />
            </div>
          </div>
        )}
        {hoverMessage && isMine && (
          <MessageActions
            side='left'
            message={message}
            onAction={onMessageAction}
          />
        )}
        <div
          className={`flex flex-col ${
            isMine ? 'items-end' : 'items-start'
          } mt-1 ${!isMine && !isLastMessageOfSameUser ? 'ml-[50px]' : ''}`}
        >
          <MessageBubble message={message} isMine={isMine} />

          {message.attachments && message.attachments.length > 0 && (
            <MessageAttachments
              attachments={message.attachments}
              isMine={isMine}
            />
          )}

          {message._id === lastSeenMessageId && <MessageSeenStatus />}
        </div>

        {hoverMessage && !isMine && (
          <MessageActions
            side='left'
            message={message}
            onAction={onMessageAction}
          />
        )}

        {isMine && <div className='w-4'></div>}
      </div>
    </div>
  );
};

export default MessageItem;
