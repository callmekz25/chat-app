import { Message } from '../types/message';

const MessageBubble = ({
  message,
  isMine,
}: {
  message: Message;
  isMine: boolean;
}) => {
  if (!message || message.message === '') {
    return null;
  }
  return (
    <div
      className={`w-fit py-1 px-4 rounded-[18px] max-w-[564px] ${
        isMine ? 'bg-[#004EFD] text-white' : 'bg-white text-black'
      }`}
    >
      <span className='text-[15px] font-normal break-words leading-5'>
        {message.message}
      </span>
    </div>
  );
};

export default MessageBubble;
