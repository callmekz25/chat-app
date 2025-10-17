import { useGetMe } from '@/modules/profile/profile.hooks';
import EmojiIcon from '@/shared/components/icons/emoji-icon';
import ImageIcon from '@/shared/components/icons/image-icon';
import VoiceIcon from '@/shared/components/icons/voice-icon';
import { useSocket } from '@/shared/contexts/socket.provider';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Message } from '@/modules/messages/types/message';
import { XIcon } from 'lucide-react';
import { MessageAction } from '@/modules/messages/types/message-action';
import { Participant } from '@/modules/directs/types/participant';
import { User } from '@/modules/user/types/user';
import MessageIcon from '@/shared/components/icons/message-icon';
import {
  appendMessageToCache,
  replaceMessageToCache,
} from '../lib/message-cache';
import { useQueryClient } from '@tanstack/react-query';
import { AttachmentType } from '../enums/attachment.enum';
import { uploadFile } from '@/modules/upload/upload.services';

type PreviewFile = {
  file: File;
  url: string;
};

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
  const queryClient = useQueryClient();
  const socket = useSocket();
  const { conversationId } = useParams();
  const [isTyping, setIsTyping] = React.useState(false);
  const typingTimeoutRef = React.useRef<number | null>(null);
  const [message, setMessage] = React.useState('');
  const [previewFiles, setPreviewFiles] = React.useState<PreviewFile[]>([]);
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

  const handleSendMessage = async () => {
    if (!socket) return;

    if (message === '' && previewFiles.length === 0) {
      return;
    }
    let uploadedAttachments = [];
    const id = crypto.randomUUID();
    // Add temp message to cache for render and upload images
    // Send event send to save message and event new replace temp message
    if (previewFiles.length > 0) {
      const tempMessage: Message = {
        tempId: id.toString(),
        conversationId: conversationId!,
        sendBy: userId!,
        message: message,
        attachments: previewFiles.map((p) => {
          return {
            url: p.url,
            publicId: '',
            type: AttachmentType.IMAGE,
          };
        }),
        createdAt: new Date().toISOString(),
      };
      appendMessageToCache(queryClient, conversationId!, tempMessage);

      uploadedAttachments = await uploadFile({
        files: previewFiles.map((p) => p.file),
        type: AttachmentType.IMAGE,
      });
    }

    socket.emit('message:send', {
      conversationId,
      message,
      tempId: id.toString(),
      attachments: uploadedAttachments,
      replyMessageId: messageReply?._id?.toString() || null,
    });

    socket.emit('conversation:stopTyping', {
      conversationId,
      userId,
    });
    setIsTyping(false);
    setMessage('');
  };

  const handleSelectedFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles = Array.from(selectedFiles).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPreviewFiles((prev) => [...prev, ...newFiles]);

    e.target.value = '';
  };

  const handleRemoveFile = (name: string) => {
    setPreviewFiles((prev) => {
      return prev.filter((item) => item.file.name !== name);
    });
  };

  React.useEffect(() => {
    return () => {
      previewFiles.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, []);

  const userOfReplyMessage =
    participants &&
    participants.find((p) => (p.user as User)._id === messageReply?.sendBy)
      ?.user;
  return (
    <div
      className={
        messageReply ? 'border-t border-gray-200' : 'border-t border-gray-200'
      }
    >
      {messageReply && (
        <div className='pt-[10px] pb-[3px] px-[15px]'>
          <div className='flex items-center justify-between'>
            <p className='text-sm'>
              Replying to{' '}
              <span className='font-semibold'>
                {userOfReplyMessage?.fullName}
              </span>
            </p>
            <XIcon className='size-5' onClick={() => onMessageAction(null)} />
          </div>
          <p className='text-[13px] opacity-70'>{messageReply.message}</p>
        </div>
      )}

      <div className='m-4 '>
        <div className='py-1.5  shadow-md pr-4 pl-[11px] rounded-2xl bg-[#F6F8FC]  flex items-center'>
          <div className='flex flex-col w-full'>
            {previewFiles.length > 0 && (
              <div className='flex flex-wrap gap-2 px-4 pt-2 pb-1'>
                <label
                  htmlFor='image'
                  className='size-18 flex items-center justify-center border border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition'
                >
                  <ImageIcon />
                </label>
                <input
                  type='file'
                  multiple
                  accept='image/*'
                  className='hidden'
                  id='image'
                  onChange={handleSelectedFiles}
                />
                {previewFiles.map((p, index) => {
                  return (
                    <div
                      key={index}
                      className='relative border border-gray-200 rounded-lg'
                    >
                      <img
                        src={p.url}
                        alt={p.file.name}
                        className='size-18 object-cover rounded-lg '
                      />
                      <button
                        onClick={() => handleRemoveFile(p.file.name)}
                        className='absolute top-0 right-0 bg-black/50 text-white rounded-full p-[2px]'
                      >
                        <XIcon className='size-4' />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            <div className='flex items-center w-full'>
              <div className='p-2 '>
                <EmojiIcon />
              </div>
              <div className='flex-1 ml-1 mr-1'>
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
                  className='w-full outline-none text-[15px] py-1.5'
                  placeholder='Type a message...'
                />
              </div>
              {message !== '' || previewFiles.length > 0 ? (
                <button
                  onClick={() => handleSendMessage()}
                  className=' hover:cursor-pointer font-medium text-blue-500 text-sm'
                >
                  <MessageIcon />
                </button>
              ) : (
                <div className='flex items-center'>
                  <div className='p-1'>
                    <label htmlFor='image'>
                      <ImageIcon />
                    </label>
                    <input
                      type='file'
                      multiple
                      className='hidden'
                      id='image'
                      onChange={(e) => handleSelectedFiles(e)}
                    />
                  </div>
                  <div className='p-2 '>
                    <VoiceIcon />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
