import BaseModal from '@/shared/components/ui/base-modal';
import { SearchIcon, XIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useGetFollowers } from '../follow.hooks';
import UserSkeleton from '@/shared/components/loading/user-skeleton';
import Avatar from '@/shared/components/ui/avatar';

const FollowersModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { user_name } = useParams();

  const { data, isLoading, isError } = useGetFollowers(user_name!);

  const followers = data?.followers;

  return (
    <BaseModal open={open} onClose={onClose}>
      <div className=' m-5 w-[560px] '>
        <div className='flex flex-col h-full w-full rounded-2xl bg-[#262626]'>
          <div className='flex items-center justify-between py-2 px-4 border-b border-gray-600 '>
            <div className=''></div>
            <h3 className='font-semibold'>Followers</h3>
            <button className=' hover:cursor-pointer' onClick={onClose}>
              <XIcon className='size-6' />
            </button>
          </div>
          <div className='py-2 px-4 w-full'>
            <div className='relative'>
              <input
                type='search'
                placeholder='Search'
                className='py-2 text-sm w-full pr-4 pl-10 rounded-lg bg-[#363636] outline-none'
              />
              <SearchIcon className='absolute top-1/2 text-gray-400 -translate-y-1/2 left-3 size-5' />
            </div>
          </div>
          <div className='min-h-[200px] max-h-[400px] overflow-y-auto'>
            {isLoading ? (
              [...Array(20)].map((_, i) => {
                return <UserSkeleton key={i} />;
              })
            ) : followers && followers.length > 0 ? (
              followers?.map((item) => {
                return (
                  <div key={item.follower._id} className='py-2 px-4 w-full'>
                    <div className='flex items-center'>
                      <Link
                        onClick={onClose}
                        to={`/${item.follower.user_name}`}
                        className='flex flex-col  mr-3'
                      >
                        <Avatar className='size-[44px]' />
                      </Link>
                      <div className='flex items-center justify-between flex-1'>
                        <div className=''>
                          <Link
                            onClick={onClose}
                            to={`/${item.follower.user_name}`}
                            className='text-sm font-semibold text-white leading-[18px]'
                          >
                            {item.follower.user_name}
                          </Link>
                          <div className='text-sm font-normal leading-[18px] text-[#A8A8A8]'>
                            {item.follower.full_name}
                          </div>
                        </div>
                        <div className=''>
                          <button className='h-[32px] bg-gray-800 hover:cursor-pointer transition-all duration-200 hover:bg-gray-700 px-4 w-auto rounded-lg text-sm font-semibold'>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className='text-center text-sm'>No result found</div>
            )}
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default FollowersModal;
