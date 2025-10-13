import InboxItem from './inbox-item';
import UserSkeleton from '@/shared/components/loading/user-skeleton';
import { useGetDirects } from '../direct.hooks';
import { useParams } from 'react-router-dom';
import { useGetMe } from '@/modules/profile/profile.hooks';
import { formatDirect } from '../utils/format-direct';
import { Direct } from '../types/direct';

const InboxList = () => {
  const { data } = useGetMe();
  const { conversationId } = useParams();
  const { data: directsResponse, isLoading } = useGetDirects();
  const directs = directsResponse?.directs.map((d: Direct) =>
    formatDirect(d, data?.user._id)
  );

  return (
    <div className=' h-full min-h-0 flex flex-col'>
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
                isActive={conversationId === item._id}
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
