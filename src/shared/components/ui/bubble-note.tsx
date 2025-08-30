const BubbleNote = () => {
  return (
    <div className='mb-[-24px] z-10'>
      <div className='min-h-[55px]'>
        <div className='max-w-[96px] min-w-[74px] flex items-center'>
          <div className='p-2 min-h-[42px] flex items-center rounded-[14px] relative w-fit max-w-[96px] bg-[#363636]'>
            <div className='min-w-[16px] max-h-[40px] line-clamp-3 text-[11px] leading-[13px] whitespace-normal break-words opacity-50'>
              Note...
            </div>

            <div className='absolute bottom-[-3px] left-3 bg-[#363636]  rounded-full size-2'></div>

            <div className='absolute bottom-[-7px] left-[18px] bg-[#363636] rounded-full size-[4px]'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BubbleNote;
