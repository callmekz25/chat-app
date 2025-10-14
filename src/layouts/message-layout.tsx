import InboxList from '@/modules/directs/components/inbox-list';
import NewInbox from '@/modules/directs/components/new-inbox';
import { useSocketMessageEvents } from '@/modules/messages/hooks/use-socket-message-events';
import { Outlet } from 'react-router-dom';

const MessageLayout = () => {
  useSocketMessageEvents();
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
