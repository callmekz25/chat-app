import AvatarNote from '@/shared/components/ui/avatar-note';
import BaseModal from '@/shared/components/ui/base-modal';
import { XIcon } from 'lucide-react';

const AddNoteModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <BaseModal open={open} onClose={onClose}>
      <div className=''>
        <div
          className='h-[65vh] rounded-3xl m-4 w-[548px] bg-[#262626]'
          style={{ maxHeight: `calc(100% - 40px)` }}
        >
          <div className='flex flex-col'>
            <div className='h-[70px] p-4 flex items-center justify-between'>
              <button>
                <XIcon className='size-6' />
              </button>
              <h3 className='text-xl font-bold leading-5'>New note</h3>
              <button className='text-[#1f28ad] text-sm font-medium'>
                Share
              </button>
            </div>
            <div className='p-4 flex flex-col justify-center items-center'>
              <div className=''>
                <AvatarNote className='size-[160px]' isAddNote />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default AddNoteModal;
