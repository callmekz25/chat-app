import { useGetMe } from '@/modules/profile/profile.hooks';
import EmojiIcon from '@/shared/components/icons/emoji-icon';
import ImageIcon from '@/shared/components/icons/image-icon';
import StickerIcon from '@/shared/components/icons/sticker-icon';
import VoiceIcon from '@/shared/components/icons/voice-icon';
import { useSocket } from '@/shared/contexts/socket.provider';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Message } from '@/modules/messages/types/message';
import { XIcon } from 'lucide-react';
import { MessageAction } from '@/modules/messages/types/message-action';
import { Participant } from '@/modules/directs/types/participant';
import { User } from '@/modules/user/types/user';

const MessageInput = ({
  messageReply,
  onMessageAction,
  participants,
}: {
  messageReply: Message | null;
  participants: Participant[] | [];
  onMessageAction: (value: MessageAction | null) => void;
}) => {
  const { data } = useGetMe();
  const socket = useSocket();
  const { conversationId } = useParams();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<number | null>(null);
  const [message, setMessage] = useState('');

  const userId = data?.user?._id;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (socket) {
      const value = e.target.value;
      setMessage(value);

      if (!isTyping) {
        socket.emit('conversation:typing', {
          conversationId,
          userId,
        });
        setIsTyping(true);
      }

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('conversation:stopTyping', {
          conversationId,
          userId,
        });
        setIsTyping(false);
      }, 3000);
    }
  };

  const handleSendMessage = () => {
    if (!socket) return;
    socket.emit('message:send', {
      conversationId,
      message,
      replyMessageId: messageReply?._id ?? null,
    });
    socket.emit('conversation:stopTyping', {
      conversationId,
      userId,
    });
    setIsTyping(false);
    setMessage('');
  };
  const userOfMessageReply =
    participants &&
    participants.find((p) => (p.user as User)._id === messageReply?.sendBy)
      ?.user;
  return (
    <div className={messageReply ? 'border-t border-gray-800' : ''}>
      {messageReply && (
        <div className='pt-[10px] pb-[3px] px-[15px]'>
          <div className='flex items-center justify-between'>
            <p className='text-sm'>
              Replying to{' '}
              <span className='font-semibold'>
                {userOfMessageReply?.fullName}
              </span>
            </p>
            <XIcon className='size-5' onClick={() => onMessageAction(null)} />
          </div>
          <p className='text-[13px] opacity-70'>{messageReply.message}</p>
        </div>
      )}
      <div className='m-4'>
        <div className='min-h-[44px] pr-4 pl-[11px] rounded-full border border-gray-700 flex items-center'>
          <div className='p-1'>
            <EmojiIcon />
          </div>
          <div className='flex-1 ml-2 mr-1'>
            <input
              type='text'
              value={message}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              onChange={(e) => handleInputChange(e)}
              className='w-full outline-none text-[15px]'
              placeholder='Message...'
            />
          </div>
          {message !== '' ? (
            <button
              onClick={() => handleSendMessage()}
              className=' hover:cursor-pointer font-medium text-blue-500 text-sm'
            >
              Send
            </button>
          ) : (
            <div className='flex items-center'>
              <div className='p-2'>
                <VoiceIcon />
              </div>
              <div className='p-1'>
                <ImageIcon />
              </div>
              <div className='p-2'>
                <StickerIcon />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
