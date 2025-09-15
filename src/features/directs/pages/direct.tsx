import { useGetDirectById } from '../direct.hooks';
import CallIcon from '@/shared/components/icons/call-icon';
import CallVideoIcon from '@/shared/components/icons/call-video-icon';
import InformationIcon from '@/shared/components/icons/information-icon';
import Avatar from '@/shared/components/ui/avatar';
import UserSkeleton from '@/shared/components/loading/user-skeleton';
import { Loader2Icon } from 'lucide-react';
import MessageItem from '@/features/messages/components/message-item';
import MessageInput from '../components/message-input';
import InfiniteScrollContainer from '@/shared/infinite-scroll-container';
import TypingIndicator from '../components/typing-indicator';
import { Link, useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useGetMe } from '@/features/profile/profile.hooks';
import useScroll from '../hooks/use-scroll';
import useTyping from '../hooks/use-typing';
import useSeenMessage from '../hooks/use-seen-message';
import { formatDirect } from '../utils/format-direct';
import { useGetMessages } from '@/features/messages/hooks/use-get-messages';

const Direct = () => {
  const { data: userRes } = useGetMe();
  const { conversation_id } = useParams();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading: ild } = useGetDirectById(conversation_id!);
  const direct = formatDirect(data?.direct, userRes?.user._id);
  const {
    containerRef,
    handleTopReached,
    messages,
    isLoading,
    isFetchingNextPage,
  } = useGetMessages(conversation_id!);
  const typingUsers = useTyping(conversation_id);

  useSeenMessage({ messages, conversation_id });
  useScroll({ bottomRef, conversation_id, messages, typingUsers });

  return (
    <div className='h-dvh flex flex-col min-h-0'>
      <div className='p-4 border-b border-gray-700'>
        <div className='min-h-[44px]'>
          {ild ? (
            <UserSkeleton />
          ) : (
            <div className='flex items-center  justify-between'>
              <Link to={`/${direct?.user_name}`} className=''>
                <div className='mr-2'>
                  <div className=' flex '>
                    <Avatar className=' mr-3 size-[44px]' />
                    <div className='flex flex-col'>
                      <div className=''>
                        <span className='leading-5 line-clamp-1 whitespace-nowrap break-words font-semibold'>
                          {direct?.name}
                        </span>
                      </div>
                      <span className='leading-4 font-normal text-[12px] break-words opacity-60'>
                        {direct?.user_name}
                      </span>
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
            {messages.map((m, index) => {
              const prevMessage = messages[index - 1];
              const isSameUser =
                prevMessage && prevMessage.user_id === m.user_id;

              return (
                <div
                  key={m._id}
                  className={`${isSameUser ? 'mt-1' : 'mt-[17px]'}`}
                >
                  <MessageItem message={m} messages={messages} />
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
                  {direct?.user_name}
                </span>
              </div>
              <div className='py-6'>
                <Link
                  to={`/${direct?.user_name}`}
                  className=' hover:opacity-90 flex items-center justify-center font-semibold text-sm rounded-lg border border-[#2b3036] h-[32px] px-4 bg-[#2b3036]'
                >
                  View profile
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <MessageInput />
    </div>
  );
};

export default Direct;
