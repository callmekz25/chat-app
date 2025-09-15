import InboxList from '@/features/directs/components/inbox-list';
import NewInbox from '@/features/directs/components/new-inbox';
import SearchUsers from '@/features/directs/components/search-users';
import { useSocketMessageEvents } from '@/features/messages/hooks/use-socket-message-events';
import Avatar from '@/shared/components/ui/avatar';
import BubbleNote from '@/shared/components/ui/bubble-note';
import { Outlet } from 'react-router-dom';

const MessageLayout = () => {
  useSocketMessageEvents();
  return (
    <div className='flex h-dvh overflow-hidden'>
      <aside className='h-dvh max-w-[398px] shrink-0 w-[398px] flex flex-col min-w-[398px] border-r border-gray-700'>
        <div className='min-h-[74px] pb-3 px-6 pt-[36px] '>
          <NewInbox />
        </div>
        <div className='px-[16px] relative'>
          <SearchUsers />
        </div>
        <div className='pl-4 mt-4'>
          <div className='w-fit flex flex-col items-center'>
            <div className='flex flex-col items-center'>
              <BubbleNote variant='compact' />
              <Avatar className='size-[74px]' />
              <div className='mt-[2px]  text-[12px] font-normal flex items-center justify-center'>
                v_nguyen04
              </div>
            </div>
          </div>
        </div>
        <div className='flex-1 min-h-0'>
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
