import Avatar from '@/shared/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { FormattedDirect } from '../types/direct';
import { User } from '@/modules/user/types/user';
import { useGetOrCreateDirect } from '../direct.hooks';
import { CreateDirect } from '../types/create-direct';
import { useGetMe } from '@/modules/profile/profile.hooks';

const InboxItem = ({
  item,
  isActive,
}: {
  item: FormattedDirect | User;
  isActive?: boolean;
}) => {
  const navigate = useNavigate();
  const { data } = useGetMe();
  const { mutate, isPending } = useGetOrCreateDirect();

  const isSeen = 'name' in item && item.lastMessage.isSeen;
  const lastMessage = 'name' in item ? item.lastMessage : null;
  const handleNavigateConversation = () => {
    if (!item || isPending) return;
    // Item is a conversation just navigate
    if ('name' in item) {
      navigate(`/direct/t/${item._id}`);
    }
    // Item is a user then create conversation and navigate
    else {
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
    }
  };
  return (
    <div
      onClick={() => handleNavigateConversation()}
      className={`flex items-center hover:cursor-pointer transition-all duration-200 py-2 px-6 ${
        isActive ? 'bg-gray-100' : ''
      }`}
    >
      <div className='pr-3 flex shrink-0 items-center justify-center'>
        <Avatar className='size-[56px]' />
      </div>
      <div className=''>
        <div className={`w-[244px] text-sm `}>
          <span className={`${isSeen ? '' : 'font-semibold'}`}>
            {'name' in item ? item.name : item.fullName}
          </span>
        </div>
        <div className=''>
          <span
            className={`text-[12px] font-normal  truncate block max-w-[247px]  ${
              isSeen ? 'opacity-60' : 'font-semibold'
            }`}
          >
            {lastMessage &&
              (lastMessage.userId === data?.user._id
                ? `You: ${lastMessage.message}`
                : lastMessage.message)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InboxItem;
