import Avatar from '@/shared/components/ui/avatar';
import BubbleNote from '@/shared/components/ui/bubble-note';
import { useEffect, useRef } from 'react';
import { useDeleteNote } from '../profile.hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const ExistingNoteModal = ({
  value,
  onClose,
  onChangeStatusNote,
}: {
  value: string;
  onClose: () => void;
  onChangeStatusNote: (value: 'addNote') => void;
}) => {
  const { user_name } = useParams();
  const queryClient = useQueryClient();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { mutate: deleteNote, isPending } = useDeleteNote();

  const handleDeleteNote = () => {
    if (isPending) return;
    deleteNote(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['user-profile', user_name],
        });
        onClose();
      },
    });
  };
  useEffect(() => {
    const handleCloseModal = (e: MouseEvent) => {
      const target = e.target as Node;
      const modalEl = modalRef.current;

      if (modalEl?.contains(target)) return;
      onClose();
    };
    document.addEventListener('mousedown', handleCloseModal);
    return () => {
      document.removeEventListener('mousedown', handleCloseModal);
    };
  }, [onClose]);
  return (
    <div
      ref={modalRef}
      className='absolute rounded-3xl m-4 top-0 left-[40%] z-50  bg-[#262626]'
    >
      <div className='w-full h-full flex flex-col'>
        <div className='w-[350px]'>
          <div className='py-[32px] flex justify-center flex-col items-center'>
            <div className='flex flex-col items-center'>
              <BubbleNote variant='detail' value={value} />
              <Avatar className='size-[160px]' />
            </div>
            <div className='text-xl font-normal leading-6'>v_nguyen04</div>
          </div>
        </div>
        <div className='mx-3 mb-3'>
          <div className='flex items-center justify-center'>
            <button
              onClick={() => onChangeStatusNote('addNote')}
              className=' hover:cursor-pointer font-semibold px-4 h-[37px] text-sm w-full bg-[#4a5df9] rounded-lg'
            >
              Leave a new note
            </button>
          </div>
          <div className='flex items-center mt-2 justify-center'>
            <button
              onClick={() => handleDeleteNote()}
              className='w-full hover:cursor-pointer font-semibold text-sm text-[#85a1ff]'
            >
              Delete note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExistingNoteModal;
