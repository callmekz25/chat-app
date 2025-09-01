import { useFollowUser } from '@/features/follow/follow.hook';
import { ChevronDownIcon, EllipsisIcon, Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Relations } from '../types/relations';

const OtherProfileActions = ({ relations }: { relations: Relations }) => {
  const { user_name } = useParams();
  const { mutate: follow, isPending } = useFollowUser();
  const handleFollowUser = () => {
    follow(user_name!, {
      onSuccess: () => {
        alert('Followed');
      },
    });
  };
  return (
    <div className='flex items-center gap-2'>
      <button
        onClick={() => handleFollowUser()}
        className={`w-auto hover:cursor-pointer h-[32px] min-w-[81px] font-semibold px-4  rounded-lg flex items-center gap-1 justify-center text-sm ${
          relations?.isFollowing ? 'bg-[#25292e]' : ' bg-[#4150F7]'
        }`}
      >
        {isPending ? (
          <Loader2 className='size-5 animate-spin' />
        ) : relations?.isFollowing ? (
          <>
            <span>Following</span>
            <ChevronDownIcon className='size-4' />
          </>
        ) : (
          <span>Follow</span>
        )}
      </button>
      <button className='w-auto h-[32px] min-w-[81px] font-semibold px-4 bg-[#25292e] rounded-lg flex items-center justify-center text-sm'>
        Message
      </button>
      <button className=''>
        <div className='p-2'>
          <EllipsisIcon />
        </div>
      </button>
    </div>
  );
};

export default OtherProfileActions;
