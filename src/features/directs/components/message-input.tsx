import EmojiIcon from '@/shared/components/icons/emoji-icon';
import ImageIcon from '@/shared/components/icons/image-icon';
import StickerIcon from '@/shared/components/icons/sticker-icon';
import VoiceIcon from '@/shared/components/icons/voice-icon';
import { useSocket } from '@/shared/contexts/socket.provider';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const MessageInput = () => {
  const socket = useSocket();
  const { conversation_id } = useParams();
  const [message, setMessage] = useState('');
  const handleSendMessage = () => {
    if (!socket) return;
    socket.emit('message:send', {
      conversation_id: conversation_id,
      message: message,
    });
    setMessage('');
  };
  return (
    <div className=''>
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
              onChange={(e) => setMessage(e.target.value)}
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
