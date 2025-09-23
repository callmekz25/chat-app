import Avatar from '@/shared/components/ui/avatar';
import BaseModal from '@/shared/components/ui/base-modal';
import { XIcon } from 'lucide-react';
import React from 'react';

const FollowSettingModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <BaseModal open={open} onClose={onClose}>
      <div className='m-5  min-h-[480px] w-[560px]'>
        <div className=' bg-[#262626] overflow-hidden  rounded-3xl'>
          <div className='flex flex-col'>
            <div className='p-4'>
              <div className='flex justify-end'>
                <div
                  onClick={() => onClose()}
                  className=' hover:cursor-pointer'
                >
                  <XIcon className='size-6' />
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <Avatar className='size-[56px]' />
                <span className='text-sm font-medium'>myphwn_</span>
              </div>
            </div>
            <div className=''>
              <div className='p-4 h-[54px] flex items-center justify-between hover:bg-[#3C3C3C]  hover:cursor-pointer'>
                <span className='text-sm'>Add to close friend list</span>
              </div>
              <div className='p-4 h-[54px] flex items-center justify-between hover:bg-[#3C3C3C]  hover:cursor-pointer'>
                <span className='text-sm'>Mute</span>
              </div>
              <div className='p-4 h-[54px] flex items-center justify-between hover:bg-[#3C3C3C]  hover:cursor-pointer'>
                <span className='text-sm'>Restrict</span>
              </div>
              <div className='p-4 h-[54px] flex items-center justify-between hover:bg-[#3C3C3C]  hover:cursor-pointer'>
                <span className='text-sm'>Unfollow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default FollowSettingModal;
