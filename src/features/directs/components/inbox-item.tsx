import Avatar from '@/shared/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { Direct } from '../types/direct';
import { Profile } from '@/features/profile/types/profile';
import { useGetOrCreateDirect } from '../direct.hooks';
import { CreateDirect } from '../types/create-direct';
import { useGetMe } from '@/features/profile/profile.hooks';

const InboxItem = ({
  item,
  isActive,
}: {
  item: Direct | Profile;
  isActive: boolean;
}) => {
  const navigate = useNavigate();
  const { data } = useGetMe();
  const { mutate, isPending } = useGetOrCreateDirect();

  const handleNavigateConversation = () => {
    if (!item || isPending) return;
    // Item is a conversation just navigate
    if ('name' in item) {
      navigate(`/direct/t/${item._id}`);
    }
    // Item is a user then create conversation and navigate
    else {
      const payload: CreateDirect = {
        other_user_id: item._id,
        type: 'direct',
      };
      mutate(payload, {
        onSuccess: (data) => {
          if (data) {
            navigate(`/direct/t/${data.conversation_id}`);
          }
        },
      });
    }
  };
  return (
    <div
      onClick={() => handleNavigateConversation()}
      className={`flex items-center hover:cursor-pointer transition-all duration-200 hover:bg-[#262626] py-2 px-6 ${
        isActive ? 'bg-[#262626]' : ''
      }`}
    >
      <div className='pr-3 flex shrink-0 items-center justify-center'>
        <Avatar className='size-[56px]' />
      </div>
      <div className=''>
        <div className='w-[244px] text-sm'>
          <span>{'name' in item ? item.name : item.full_name}</span>
        </div>
        <div className=''>
          <span className='text-[12px] font-normal opacity-60 truncate block max-w-[247px] '>
            {'name' in item
              ? item.last_message
                ? item.last_message.user_id === data?.user._id
                  ? `You: ${item.last_message.message}`
                  : item.last_message.message
                : 'Active 1m ago'
              : item.user_name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InboxItem;
