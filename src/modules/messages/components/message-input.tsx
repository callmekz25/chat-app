import { useGetMe } from '@/modules/profile/profile.hooks';
import EmojiIcon from '@/shared/components/icons/emoji-icon';
import ImageIcon from '@/shared/components/icons/image-icon';
import VoiceIcon from '@/shared/components/icons/voice-icon';
import { Message } from '@/modules/messages/types/message';
import { SendHorizonalIcon, XIcon } from 'lucide-react';
import { MessageAction } from '@/modules/messages/types/message-action';
import { Participant } from '@/modules/directs/types/participant';
import { User } from '@/modules/user/types/user';
import { useMessageInput } from '../hooks/use-message-input';
import PreviewFileItem from './preview-file-item';

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
  const userId = data?.user?._id;

  const {
    message,
    textareaRef,
    previewFiles,
    handleInputChange,
    handleSelectedFiles,
    handleRemoveFile,
    handleSendMessage,
  } = useMessageInput(messageReply, userId);

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
        <div className='py-1  pr-2 pl-[11px] rounded-3xl bg-[#edeff1]  flex items-center'>
          <div className='flex flex-col w-full'>
            {previewFiles.length > 0 && (
              <div className='flex flex-wrap gap-2 px-4 pt-2 pb-1'>
                <label
                  htmlFor='fils'
                  className='size-20 flex items-center justify-center border border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition'
                >
                  <ImageIcon />
                </label>
                <input
                  type='file'
                  multiple
                  className='hidden'
                  id='files'
                  onChange={handleSelectedFiles}
                />
                {previewFiles.map((p) => {
                  return (
                    <PreviewFileItem
                      key={p.file.name}
                      file={p.file}
                      url={p.url}
                      type={p.type}
                      onRemove={handleRemoveFile}
                    />
                  );
                })}
              </div>
            )}
            <div className='flex items-end w-full'>
              <div className='p-2 '>
                <EmojiIcon />
              </div>
              <div className='flex-1 ml-1 mr-1 '>
                <textarea
                  ref={textareaRef}
                  value={message}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  onChange={(e) => handleInputChange(e)}
                  className='w-full outline-none  text-[15px] py-1.5 h-full resize-none overflow-hidden'
                  placeholder='Type a message...'
                  rows={1}
                />
              </div>
              {message !== '' || previewFiles.length > 0 ? (
                <div className='p-2'>
                  <SendHorizonalIcon
                    onClick={() => handleSendMessage()}
                    className='size-6 hover:cursor-pointer'
                  />
                </div>
              ) : (
                <div className='flex items-center'>
                  <div className='p-1'>
                    <label htmlFor='image' className='hover:cursor-pointer'>
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
                  <div className='p-2 hover:cursor-pointer '>
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
