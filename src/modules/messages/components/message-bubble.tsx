import { useGetMe } from '@/modules/profile/profile.hooks';
import { Message } from '../types/message';
import ReplyIcon from '@/shared/components/icons/reply-icon';

const MessageBubble = ({
  message,
  isMine,
}: {
  message: Message;
  isMine: boolean;
}) => {
  const { data } = useGetMe();
  if (!message || message.message === '') {
    return null;
  }
  console.log(message);
  const myReplyMessage =
    message.replyMessage && message.replyMessage.sendBy._id === data?.user._id;
  return (
    <div className={`flex flex-col ${isMine ? ' items-end' : 'items-start'}`}>
      {message.replyMessage && (
        <div
          className={`flex flex-col ${isMine ? ' items-end' : 'items-start'}`}
        >
          <div className='flex items-center gap-2 text-[#929497]'>
            <ReplyIcon />
            <p className='text-[12px]'>
              {isMine ? 'Bạn' : message.sendBy.fullName} đã trả lời{' '}
              {myReplyMessage ? 'bạn' : message.replyMessage.sendBy.fullName}
            </p>
          </div>
          <div className='w-fit py-1 px-4 whitespace-pre-wrap rounded-[18px] max-w-[564px] bg-[#f7f7f7] text-black'>
            <span className='text-[15px] font-normal break-words leading-5'>
              {message.replyMessage.message}
            </span>
          </div>
        </div>
      )}
      <div
        className={`w-fit py-1 px-4 whitespace-pre-wrap rounded-[18px] max-w-[564px] ${
          isMine ? 'bg-[#056df6] text-white' : 'bg-[#f0f0f0] text-black'
        }`}
      >
        <span className='text-[15px] font-normal break-words leading-5'>
          {message.message}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
