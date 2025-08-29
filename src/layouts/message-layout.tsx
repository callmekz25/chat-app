import InboxList from '@/features/messages/components/inbox-list';
import NewMessage from '@/features/messages/components/new-message';
import Note from '@/features/messages/components/note';
import SearchFollowing from '@/features/messages/components/search-following';
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
          <Note />
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
