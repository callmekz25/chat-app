import { EditIcon } from 'lucide-react';

const NewMessage = () => {
  return (
    <div className='flex items-center justify-between'>
      <h3 className='text-xl font-bold'>v_nguyen04</h3>
      <button>
        <EditIcon />
      </button>
    </div>
  );
};

export default NewMessage;
