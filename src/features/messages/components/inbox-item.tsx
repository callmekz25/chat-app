import Avatar from '@/shared/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { Direct } from '../types/direct';

const InboxItem = ({ direct }: { direct: Direct }) => {
  const navigate = useNavigate();

  // const { mutate, isPending } = useGetOrCreateDirect();

  // const handleGetOrCreateDirect = () => {
  //   if (!direct || isPending) return;
  //   const payload: CreateDirect = {
  //     other_user_id: direct._id,
  //     type: 'direct',
  //   };
  //   mutate(payload, {
  //     onSuccess: (data) => {
  //       if (data) {
  //         navigate(`/direct/t/${data.conversation_id}`);
  //       }
  //     },
  //   });
  // };
  return (
    <div
      onClick={() => navigate(`/direct/t/${direct._id}`)}
      className=' flex items-center hover:cursor-pointer transition-all duration-200 hover:bg-white/10 py-2 px-6'
    >
      <div className='pr-3 flex shrink-0 items-center justify-center'>
        <Avatar className='size-[56px]' />
      </div>
      <div className=''>
        <div className='w-[244px] text-sm'>
          <span>{direct.name}</span>
        </div>
        <div className=''>
          <span className='text-[12px] font-normal opacity-60'>
            Active 1m ago
          </span>
        </div>
      </div>
    </div>
  );
};

export default InboxItem;
