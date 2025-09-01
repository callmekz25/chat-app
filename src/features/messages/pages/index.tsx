import DirectIcon from '@/shared/components/icons/direct-icon';

const DirectInbox = () => {
  return (
    <div className='flex h-dvh items-center justify-center'>
      <div className='flex flex-col items-center'>
        <DirectIcon />
        <p className='pt-4 px-4 text-xl font-normal leading-6'>Your messages</p>
        <p className='pt-2 px-4 text-sm font-normal opacity-70'>
          Send a message to start a chat.
        </p>
        <div className='pt-4 px-4'>
          <button className='h-[32px] hover:cursor-pointer transition-all duration-200 hover:opacity-90 text-sm font-semibold px-4 rounded-lg bg-[#4150f7]'>
            Send message
          </button>
        </div>
      </div>
    </div>
  );
};

export default DirectInbox;
