import { EditIcon } from 'lucide-react';
import SearchUsers from './search-users';

const NewInbox = () => {
  return (
    <div className='flex items-center justify-between'>
      <h3 className='text-2xl font-bold text-[#053ADF] '>Messages</h3>
      <div className='flex items-center gap-2'>
        <button>
          <EditIcon />
        </button>
        <button>
          <SearchUsers />
        </button>
      </div>
    </div>
  );
};

export default NewInbox;
