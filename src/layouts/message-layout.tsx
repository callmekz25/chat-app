import InboxList from '@/features/messages/components/inbox-list';
import NewMessage from '@/features/messages/components/new-message';
import SearchFollowing from '@/features/messages/components/search-following';
import Avatar from '@/shared/components/ui/avatar';
import BubbleNote from '@/shared/components/ui/bubble-note';
import { Outlet } from 'react-router-dom';

const MessageLayout = () => {
  return (
    <div className='flex h-dvh overflow-hidden'>
      <aside className='h-dvh max-w-[398px] shrink-0 w-[398px] flex flex-col min-w-[398px] border-r border-gray-700'>
        <div className='min-h-[74px] pb-3 px-6 pt-[36px] '>
          <NewMessage />
        </div>
        <div className='px-[16px]'>
          <SearchFollowing />
        </div>
        <div className='pl-4 mt-4'>
          <div className='w-fit flex flex-col items-center'>
            <div className='flex flex-col items-center'>
              <BubbleNote variant='compact' />
              <Avatar />
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
