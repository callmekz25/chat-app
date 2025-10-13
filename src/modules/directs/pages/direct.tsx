import { useGetDirectById } from '../direct.hooks';
import CallIcon from '@/shared/components/icons/call-icon';
import CallVideoIcon from '@/shared/components/icons/call-video-icon';
import InformationIcon from '@/shared/components/icons/information-icon';
import Avatar from '@/shared/components/ui/avatar';
import UserSkeleton from '@/shared/components/loading/user-skeleton';
import { Loader2Icon } from 'lucide-react';
import MessageItem from '@/modules/messages/components/message-item';
import MessageInput from '../../messages/components/message-input';
import InfiniteScrollContainer from '@/shared/infinite-scroll-container';
import TypingIndicator from '../components/typing-indicator';
import { Link, useParams } from 'react-router-dom';
import React from 'react';
import { useGetMe } from '@/modules/profile/profile.hooks';
import useScroll from '../hooks/use-scroll';
import useTyping from '../hooks/use-typing';
import useSeenMessage from '../hooks/use-seen-message';
import { formatDirect } from '../utils/format-direct';
import { useGetMessages } from '@/modules/messages/hooks/use-get-messages';
import { MessageAction } from '@/modules/messages/types/message-action';
import { Message } from '@/modules/messages/types/message';

const Direct = () => {
  const { data: userRes } = useGetMe();
  const [messageAction, setMessageAction] =
    React.useState<MessageAction | null>(null);
  const { conversationId } = useParams();
  const bottomRef = React.useRef<HTMLDivElement | null>(null);
  const { data, isLoading: ild } = useGetDirectById(conversationId!);
  const direct = formatDirect(data?.direct, userRes?.user._id);
  console.log(direct);

  const {
    containerRef,
    handleTopReached,
    messages,
    isLoading,
    isFetchingNextPage,
  } = useGetMessages(conversationId!);
  const typingUsers = useTyping(conversationId);

  const participants = direct.participants ?? [];

  useSeenMessage({ messages, conversationId });
  useScroll({
    bottomRef,
    conversationId,
    messages,
    typingUsers,
    messageAction,
  });

  return (
    <div className='h-dvh flex flex-col min-h-0'>
      <div className='p-4 border-b border-gray-700'>
        <div className='min-h-[44px]'>
          {ild ? (
            <UserSkeleton />
          ) : (
            <div className='flex items-center   justify-between'>
              <Link to={`/${direct?.name}`} className=''>
                <div className='mr-2'>
                  <div className=' flex '>
                    <Avatar className=' mr-3 size-[44px]' />
                    <div className='flex flex-col'>
                      <div className=''>
                        <span className='leading-5 line-clamp-1 whitespace-nowrap break-words font-semibold'>
                          {direct?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <div className='flex items-center'>
                <div className='p-2'>
                  <CallIcon />
                </div>
                <div className='p-2'>
                  <CallVideoIcon />
                </div>
                <div className='p-2'>
                  <InformationIcon />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <main
        className='flex-1 min-h-0 overflow-y-auto transition-all duration-200'
        ref={containerRef}
      >
        {isLoading ? (
          <div className='flex items-center justify-center mt-2'>
            <Loader2Icon className=' animate-spin size-8 text-gray-400' />
          </div>
        ) : messages?.length ? (
          <InfiniteScrollContainer onTopReached={handleTopReached}>
            {isFetchingNextPage && (
              <div className='flex items-center justify-center mt-2'>
                <Loader2Icon className=' animate-spin size-8 text-gray-400' />
              </div>
            )}
            {messages.map((m: Message, index) => {
              const prevMessage = messages[index - 1];
              const isSameUser = prevMessage && prevMessage.userId === m.sendBy;

              return (
                <div
                  key={m._id}
                  className={`${isSameUser ? 'mt-1' : 'mt-[17px]'}`}
                >
                  <MessageItem
                    message={m}
                    messages={messages}
                    onMessageAction={setMessageAction}
                  />
                </div>
              );
            })}
            <TypingIndicator typingUsers={typingUsers} />
            <div className='' ref={bottomRef}></div>
          </InfiniteScrollContainer>
        ) : (
          <div className='mt-5'>
            <div className='flex flex-col items-center'>
              <div className='py-4'>
                <Avatar className='size-[96px]' />
              </div>
              <div className=' text-center'>
                <span className='leading-6 font-semibold text-xl'>
                  {data?.direct?.name}
                </span>
              </div>
              <div className=''>
                <span className='leading-[18px] text-sm font-normal opacity-60'>
                  {direct?.userName}
                </span>
              </div>
              <div className='py-6'>
                <Link
                  to={`/${direct?.userName}`}
                  className=' hover:opacity-90 flex items-center justify-center font-semibold text-sm rounded-lg border border-[#2b3036] h-[32px] px-4 bg-[#2b3036]'
                >
                  View profile
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <MessageInput
        messageReply={
          messageAction?.action === 'REPLY' ? messageAction.message : null
        }
        participants={participants}
        onMessageAction={setMessageAction}
      />
    </div>
  );
};

export default Direct;
