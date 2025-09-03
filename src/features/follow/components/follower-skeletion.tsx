import React from 'react';

const FollwerSkeleton = () => {
  return (
    <div className='py-2 px-4 w-full animate-pulse'>
      <div className='flex items-center'>
        <div className='flex flex-col size-[44px] mr-3'>
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

export default FollwerSkeleton;
