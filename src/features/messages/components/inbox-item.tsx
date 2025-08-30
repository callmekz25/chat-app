import Avatar from '@/shared/components/ui/avatar';

const InboxItem = () => {
  return (
    <div className=' flex items-center hover:cursor-pointer transition-all duration-200 hover:bg-white/10 py-2 px-6'>
      <div className='pr-3 flex shrink-0 items-center justify-center'>
        <Avatar />
      </div>
      <div className=''>
        <div className='w-[244px] text-sm'>
          <span>Khanh Vinh</span>
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
