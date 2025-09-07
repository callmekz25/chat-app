import { useGetMe } from '@/features/profile/profile.hook';
import { Message } from '../types/message';
import Avatar from '@/shared/components/ui/avatar';

const MessageItem = ({ message }: { message: Message }) => {
  const { data } = useGetMe();
  return (
    <div className='flex'>
      {data?.user._id !== message.user_id && (
        <div className='flex items-end'>
          <div className='pl-[14px] pr-2'>
            <Avatar className='size-[28px]' />
          </div>
        </div>
      )}
      <div
        className={` w-fit py-1  px-3 rounded-[18px] max-w-[564px] ${
          data?.user._id === message.user_id
            ? 'bg-[#3797F0] ml-auto'
            : 'mr-auto bg-[#262626]'
        }`}
      >
        <span className='text-[15px] font-normal break-words leading-5'>
          {message.message}
        </span>
      </div>
      {data?.user._id === message.user_id && <div className='w-4'></div>}
    </div>
  );
};

export default MessageItem;
