import { Link, useParams } from 'react-router-dom';
import { useGetDirectById } from '../direct.hooks';
import CallIcon from '@/shared/components/icons/call-icon';
import CallVideoIcon from '@/shared/components/icons/call-video-icon';
import InformationIcon from '@/shared/components/icons/information-icon';
import Avatar from '@/shared/components/ui/avatar';
import UserSkeleton from '@/shared/components/loading/user-skeleton';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSocket } from '@/shared/contexts/socket.provider';
import { useGetInfiniteMessages } from '@/features/messages/message.hooks';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { Message } from '@/features/messages/types/message';
import MessageItem from '@/features/messages/components/message-item';
import MessageInput from '../components/message-input';
import InfiniteScrollContainer from '@/shared/infinite-scroll-container';
const Direct = () => {
  const queryClient = useQueryClient();
  const lastMessage = useRef<HTMLDivElement | null>(null);
  const isFirstLoad = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { conversation_id } = useParams();
  const { data, isLoading: ild, isError } = useGetDirectById(conversation_id!);
  const {
    data: messagesRes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useGetInfiniteMessages(conversation_id!);

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.emit('conversation:join', { conversation_id });

      const onNewMessage = (data: {
        conversation_id: string;
        message: Message;
      }) => {
        if (data.conversation_id !== conversation_id) return;

        queryClient.setQueryData<InfiniteData<{ messages: Message[] }>>(
          ['messages', conversation_id],
          (old) => {
            if (!old) {
              return {
                pages: [{ messages: [data.message] }],
                pageParams: [undefined],
              };
            }
            const pages = [...old.pages];
            pages[0] = {
              ...pages[0],
              messages: [...pages[0].messages, data.message],
            };
            return { ...old, pages };
          }
        );
        requestAnimationFrame(() => {
          lastMessage.current?.scrollIntoView({
            behavior: 'smooth',
          });
        });
      };
      socket.on('message:new', onNewMessage);

      return () => {
        socket.emit('conversation:leave', { conversation_id });
        socket.off('message:new', onNewMessage);
      };
    }
  }, [socket, conversation_id, queryClient]);

  const messages = (messagesRes?.pages ?? [])
    .slice()
    .reverse()
    .flatMap((p) => p.messages);

  useEffect(() => {
    if (messages.length && isFirstLoad.current) {
      requestAnimationFrame(() => {
        lastMessage.current?.scrollIntoView({ behavior: 'auto' });
      });
      isFirstLoad.current = false;
    }
  }, [messages]);

  const handleTopReached = async () => {
    if (!hasNextPage || isFetching) return;
    const el = containerRef.current!;
    const prevHeight = el.scrollHeight;
    const prevTop = el.scrollTop;

    await fetchNextPage();
    requestAnimationFrame(() => {
      const newHeight = el.scrollHeight;
      el.scrollTop = prevTop + (newHeight - prevHeight);
    });
  };
  return (
    <div className='h-dvh flex flex-col min-h-0'>
      <div className='p-4 border-b border-gray-700'>
        <div className='min-h-[44px]'>
          {ild ? (
            <UserSkeleton />
          ) : (
            <div className='flex items-center  justify-between'>
              <Link to={`/${data?.direct.user_name}`} className=''>
                <div className='mr-2'>
                  <div className=' flex '>
                    <Avatar className=' mr-3 size-[44px]' />
                    <div className='flex flex-col'>
                      <div className=''>
                        <span className='leading-5 line-clamp-1 whitespace-nowrap break-words font-semibold'>
                          {data?.direct.name}
                        </span>
                      </div>
                      <span className='leading-4 font-normal text-[12px] break-words opacity-60'>
                        {data?.direct?.user_name}
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
      <main className='flex-1 min-h-0 overflow-y-auto' ref={containerRef}>
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
                  <MessageItem message={m} />
                </div>
              );
            })}
            <div className='' ref={lastMessage}></div>
          </InfiniteScrollContainer>
        ) : (
          <div className='mt-5'>
            <div className='flex flex-col items-center'>
              <div className='py-4'>
                <Avatar className='size-[96px]' />
              </div>
              <div className=' text-center'>
                <span className='leading-6 font-semibold text-xl'>
                  {data?.direct.name}
                </span>
              </div>
              <div className=''>
                <span className='leading-[18px] text-sm font-normal opacity-60'>
                  {data?.direct.user_name}
                </span>
              </div>
              <div className='py-6'>
                <Link
                  to={`/${data?.direct.user_name}`}
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
