import InboxList from '@/modules/directs/components/inbox-list';
import NewInbox from '@/modules/directs/components/new-inbox';
import { useMessageEvents } from '@/modules/messages/hooks/use-message-events';
import { useGetMe } from '@/modules/profile/profile.hooks';
import { useSocket } from '@/shared/contexts/socket.provider';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MessageLayout = () => {
  const socket = useSocket();
  const { data } = useGetMe();
  React.useEffect(() => {
    if (socket && data?.user?._id) {
      socket.emit('register', data.user._id);
      console.log('✅ Registered socket for user', data.user._id);
    }
  }, [socket, data?.user?._id]);
  useMessageEvents();
  return (
    <div className='flex h-dvh overflow-hidden'>
      <aside className='h-dvh max-w-[398px] shrink-0 w-[398px] flex flex-col min-w-[398px] border-r border-gray-200'>
        <div className='p-6 border-b border-gray-200'>
          <NewInbox />
        </div>
        <div className='flex-1 min-h-0 py-6 '>
          <InboxList />
        </div>
      </aside>
      <div className='flex-1 w-full'>
        <Outlet />
      </div>
    </div>
  );
};

export default MessageLayout;
