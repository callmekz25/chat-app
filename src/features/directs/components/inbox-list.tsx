import InboxItem from './inbox-item';
import UserSkeleton from '@/shared/components/loading/user-skeleton';
import { useGetDirects } from '../direct.hooks';
import { useParams } from 'react-router-dom';
import { useGetMe } from '@/features/profile/profile.hooks';
import { formatDirect } from '../utils/format-direct';
import { Direct } from '../types/direct';

const InboxList = () => {
  const { data } = useGetMe();
  const { conversation_id } = useParams();
  const { data: directsResponse, isLoading } = useGetDirects();
  const directs = directsResponse?.directs.map((d: Direct) =>
    formatDirect(d, data?.user._id)
  );

  return (
    <div className=' h-full min-h-0 flex flex-col'>
      <div className='pt-[14px] pb-2.5 flex items-center justify-between px-6'>
        <span className='font-bold leading-5'>Messages</span>
      </div>
      <div className=' overflow-y-auto flex-1 min-h-0'>
        {isLoading ? (
          [
            ...Array(8).map((_, i) => {
              return <UserSkeleton key={i} />;
            }),
          ]
        ) : directs && directs.length > 0 ? (
          directs.map((item) => {
            return (
              <InboxItem
                key={item._id}
                item={item}
                isActive={conversation_id === item._id}
              />
            );
          })
        ) : (
          <div>Not found</div>
        )}
      </div>
    </div>
  );
};

export default InboxList;
