const Note = () => {
  return (
    <button className='flex flex-col w-[96px] items-center relative'>
      <div className='mb-[-24px] z-10'>
        <div className='min-h-[55px]'>
          <div className='min-w-[74px] max-w-[96px] flex items-center'>
            <div className='p-2 min-h-[42px] rounded-[14px] relative w-fit max-w-[96px] bg-[#363636]'>
              <div className='min-w-[16px] text-[11px] leading-[13px] whitespace-normal break-words '>
                abbadsadmmmmmmmmmmmmmasdmsad
              </div>
              <div className=' absolute ml-1 bg-[#363636] rounded-full size-3'></div>
              <div className=' absolute ml-3.5 mt-3 bg-[#363636] rounded-full size-[5px]'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='rounded-full'>
        <div className='size-[74px]'>
          <img
            src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
            className=' aspect-square w-full object-cover rounded-full select-none'
          />
        </div>
      </div>
      <div className='mt-[2px] text-[12px] font-normal flex items-center justify-center'>
        v_nguyen04
      </div>
    </button>
  );
};

export default Note;
