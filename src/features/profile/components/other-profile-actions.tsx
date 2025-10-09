import { useFollowUser } from '@/features/follow/follow.hooks';
import { ChevronDownIcon, EllipsisIcon, Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Relations } from '../types/relations';
import React from 'react';
import FollowSettingModal from '@/features/follow/components/follow-setting.modal';
const OtherProfileActions = ({ relations }: { relations: Relations }) => {
  const { userName } = useParams();
  const [openSettingFollow, setOpenSettingFollow] = React.useState(false);
  const { mutate: follow, isPending } = useFollowUser();
  const handleFollowUser = () => {
    follow(userName!, {
      onSuccess: () => {
        alert('Followed');
      },
    });
  };
  return (
    <div className='flex items-center gap-2'>
      <div
        className={`w-auto hover:cursor-pointer h-[32px] min-w-[81px] font-semibold px-4  rounded-lg flex items-center gap-1 justify-center text-sm ${
          relations?.isFollowing ? 'bg-[#25292e]' : ' bg-[#4150F7]'
        }`}
      >
        {isPending ? (
          <Loader2 className='size-5 animate-spin' />
        ) : relations?.isFollowing ? (
          <div
            onClick={() => setOpenSettingFollow(true)}
            className='flex items-center'
          >
            <span>Following</span>
            <ChevronDownIcon className='size-4' />
          </div>
        ) : (
          <div className='' onClick={() => handleFollowUser()}>
            <span>Follow</span>
          </div>
        )}
      </div>
      <button className='w-auto h-[32px] min-w-[81px] font-semibold px-4 bg-[#25292e] rounded-lg flex items-center justify-center text-sm'>
        Message
      </button>
      <button className=''>
        <div className='p-2'>
          <EllipsisIcon />
        </div>
      </button>
      <FollowSettingModal
        open={openSettingFollow}
        onClose={() => setOpenSettingFollow(false)}
      />
    </div>
  );
};

export default OtherProfileActions;
