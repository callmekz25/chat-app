import BaseModal from '@/shared/components/ui/base-modal';
import { XIcon } from 'lucide-react';
import { useState } from 'react';
import { useAddNote } from '../profile.hook';
import { useQueryClient } from '@tanstack/react-query';
import BubbleNote from '@/shared/components/ui/bubble-note';
import Avatar from '@/shared/components/ui/avatar';

const AddNoteModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [note, setNote] = useState('');
  const queryClient = useQueryClient();
  const { mutate: addNote, isPending } = useAddNote();
  const handleAddNote = () => {
    if (note === '') return;
    addNote(note, {
      onSuccess: (data) => {
        queryClient.setQueryData(['note'], data);
        onClose();
      },
    });
  };
  return (
    <BaseModal open={open} onClose={onClose}>
      <div className=''>
        <div
          className='h-[65vh] rounded-3xl m-4 w-[548px] bg-[#262626]'
          style={{ maxHeight: `calc(100% - 40px)` }}
        >
          <div className='flex flex-col'>
            <div className='h-[70px] p-4 flex items-center justify-between'>
              <button
                className='hover:cursor-pointer'
                onClick={() => onClose()}
              >
                <XIcon className='size-6' />
              </button>
              <h3 className='text-xl font-bold leading-5'>New note</h3>
              <button
                disabled={isPending}
                onClick={() => handleAddNote()}
                className={` hover:cursor-pointer text-sm font-medium ${
                  note !== '' ? 'text-blue-500' : 'text-[#1f28ad]'
                }`}
              >
                Share
              </button>
            </div>
            <div className='p-4 flex flex-col justify-center items-center'>
              <div className='flex flex-col items-center'>
                <BubbleNote value={note} onChange={setNote} variant='add' />
                <Avatar className='size-[160px]' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default AddNoteModal;
