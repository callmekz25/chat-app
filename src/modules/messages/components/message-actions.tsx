import { EllipsisVerticalIcon, ReplyIcon, SmileIcon } from 'lucide-react';
import { Message } from '../types/message';
import { MessageAction } from '../types/message-action';

const MessageActions = ({
  side,
  message,
  onAction,
}: {
  side: 'left' | 'right';
  message: Message;
  onAction: (action: MessageAction) => void;
}) => (
  <div className={`${side === 'left' ? 'ml-2' : 'mr-2'}`}>
    <div className='flex items-center gap-3'>
      <button onClick={() => onAction({ message, action: 'EMOJI' })}>
        <SmileIcon className='size-5' />
      </button>
      <button onClick={() => onAction({ message, action: 'REPLY' })}>
        <ReplyIcon className='size-5' />
      </button>
      <button onClick={() => onAction({ message, action: 'FORWARD' })}>
        <EllipsisVerticalIcon className='size-5' />
      </button>
    </div>
  </div>
);

export default MessageActions;
