import { User } from '@/modules/user/types/user';
import React from 'react';
import { CreateDirect } from '../types/create-direct';
import Avatar from '@/shared/components/ui/avatar';
import { useGetOrCreateDirect } from '../direct.hooks';
import { useNavigate } from 'react-router-dom';
import { XIcon } from 'lucide-react';

const SearchUserItem = ({ item }: { item: User }) => {
  const { mutate, isPending } = useGetOrCreateDirect();
  const navigate = useNavigate();
  const handleNavigateConversation = () => {
    if (!item || isPending) return;
    const payload: CreateDirect = {
      otherUserId: item._id,
      type: 'direct',
    };
    mutate(payload, {
      onSuccess: (data) => {
        if (data) {
          navigate(`/direct/t/${data.conversationId}`);
        }
      },
    });
  };
  return (
    <div
      onClick={() => handleNavigateConversation()}
      className={`flex items-center hover:cursor-pointer transition-all duration-200 py-2 px-3 hover:bg-gray-200 rounded-lg `}
    >
      <div className='pr-3 flex shrink-0 items-center justify-center'>
        <Avatar className='size-11' />
      </div>
      <div className='flex items-center'>
        <div className={`w-[244px] text-md flex items-center justify-start`}>
          <span>{item.fullName}</span>
        </div>
        {/* <button>
          <XIcon className='size-5' />
        </button> */}
      </div>
    </div>
  );
};

export default SearchUserItem;
