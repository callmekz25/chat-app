import SettingIcon from '@/shared/components/icons/setting-icon';

const OwnProfileActions = () => {
  return (
    <div className='flex items-center gap-2'>
      <button className='w-auto h-[32px] min-w-[81px] font-semibold px-4 bg-[#25292e] rounded-lg flex items-center justify-center text-sm'>
        Edit profile
      </button>
      <button className='w-auto h-[32px] min-w-[81px] font-semibold px-4 bg-[#25292e] rounded-lg flex items-center justify-center text-sm'>
        View archive
      </button>
      <div className=''>
        <div className='p-2'>
          <SettingIcon />
        </div>
      </div>
    </div>
  );
};

export default OwnProfileActions;
