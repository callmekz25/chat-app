import clsx from 'clsx';

const UserSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className=' w-full animate-pulse'>
      <div className='flex items-center'>
        <div className={clsx('flex flex-col size-[44px] mr-3', className)}>
          <div className='w-full aspect-square rounded-full bg-[#1A1A1A]'></div>
        </div>

        <div className='flex items-center justify-between flex-1'>
          <div className='space-y-2'>
            {/* Username Skeleton */}
            <div className='h-[14px] w-[120px] bg-[#1A1A1A] rounded'></div>
            {/* Fullname Skeleton */}
            <div className='h-[14px] w-[80px] bg-[#1A1A1A] rounded'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSkeleton;
