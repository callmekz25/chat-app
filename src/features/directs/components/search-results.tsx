import { useGetFollowings } from '@/features/follow/follow.hooks';
import { useGetMe } from '@/features/profile/profile.hooks';
import InboxItem from './inbox-item';
import UserSkeleton from '@/shared/components/loading/user-skeleton';

const SearchResults = () => {
  const { data: userRes } = useGetMe();
  const { data: followingsRes, isLoading } = useGetFollowings(
    userRes!.user.user_name
  );
  return (
    <div
      className={`absolute left-0 right-0
      top-full
      bottom-0
      bg-black
      z-40
      mt-3
      min-h-0
      w-full
      ${isLoading ? '' : ' overflow-y-auto'}`}
      style={{ height: 'calc(100dvh - (76px + 40px + 12px))' }}
    >
      {isLoading
        ? [...Array(20)].map((_, i) => {
            return (
              <div className='py-2 px-6' key={i}>
                <UserSkeleton className='size-[56px]' />
              </div>
            );
          })
        : followingsRes?.followings.map((item) => (
            <InboxItem key={item.following._id} item={item.following} />
          ))}
    </div>
  );
};

export default SearchResults;
