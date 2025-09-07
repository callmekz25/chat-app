import Avatar from '@/shared/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { Direct } from '../types/direct';
import { Profile } from '@/features/profile/types/profile';
import { useGetOrCreateDirect } from '../direct.hook';
import { CreateDirect } from '../types/create-direct';

const InboxItem = ({ item }: { item: Direct | Profile }) => {
  const navigate = useNavigate();

  const { mutate, isPending } = useGetOrCreateDirect();

  const handleNavigateConversation = () => {
    if (!item || isPending) return;
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
  };
  return (
    <div
      onClick={() => handleNavigateConversation()}
      className=' flex items-center hover:cursor-pointer transition-all duration-200 hover:bg-white/10 py-2 px-6'
    >
      <div className='pr-3 flex shrink-0 items-center justify-center'>
        <Avatar className='size-[56px]' />
      </div>
      <div className=''>
        <div className='w-[244px] text-sm'>
          <span>{'name' in item ? item.name : item.full_name}</span>
        </div>
        <div className=''>
          <span className='text-[12px] font-normal opacity-60'>
            {'name' in item ? 'Active 1m ago' : item.user_name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InboxItem;
