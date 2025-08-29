const InboxItem = () => {
  return (
    <div className=' flex items-center hover:cursor-pointer transition-all duration-200 hover:bg-white/10 py-2 px-6'>
      <div className='pr-3 flex shrink-0 items-center justify-center'>
        <div className='size-[56px] select-none'>
          <img
            src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
            className=' aspect-square object-cover w-full rounded-full'
          />
        </div>
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
